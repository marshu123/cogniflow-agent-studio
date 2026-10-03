import { Agent, AgentStep, Artifact, TelemetryMetrics, ToolCall, WorkflowEdge } from '../types/agent';
import { getScenarioExecutionPlan } from './mockEngine';
import { TOOLS_REGISTRY } from './tools';

export interface ExecutionCallbacks {
  onStepAdded: (step: AgentStep) => void;
  onAgentStateChange: (agentId: string, status: Agent['status'], currentTask?: string) => void;
  onEdgeActiveChange: (edgeId: string, active: boolean) => void;
  onTelemetryUpdate: (telemetry: TelemetryMetrics) => void;
  onArtifactReady: (artifact: Artifact) => void;
  onComplete: () => void;
}

export class AgentOrchestrator {
  private isRunning: boolean = false;
  private abortController: AbortController | null = null;

  public async runWorkflow(
    presetId: string,
    agents: Agent[],
    edges: WorkflowEdge[],
    callbacks: ExecutionCallbacks
  ): Promise<void> {
    if (this.isRunning) return;
    this.isRunning = true;
    this.abortController = new AbortController();

    const plan = getScenarioExecutionPlan(presetId);
    let totalTokens = 0;
    const startTime = performance.now();
    let completedSteps = 0;
    let toolCallCount = 0;

    // Reset all agents to idle
    agents.forEach((a) => {
      callbacks.onAgentStateChange(a.id, 'idle', undefined);
    });

    try {
      for (let i = 0; i < plan.steps.length; i++) {
        if (this.abortController.signal.aborted) break;

        const stepDef = plan.steps[i];
        const stepStartTime = performance.now();

        // 1. Highlight agent and set status
        callbacks.onAgentStateChange(stepDef.agentId, 'executing', stepDef.content.slice(0, 60) + '...');

        // 2. Activate connecting edges if any
        const relevantEdge = edges.find(
          (e) => e.target === stepDef.agentId || e.source === stepDef.agentId
        );
        if (relevantEdge) {
          callbacks.onEdgeActiveChange(relevantEdge.id, true);
        }

        // 3. Handle tool calls if specified
        let executedToolCall: ToolCall | undefined = undefined;
        if (stepDef.toolCallName && TOOLS_REGISTRY[stepDef.toolCallName]) {
          callbacks.onAgentStateChange(stepDef.agentId, 'tool_calling', `Calling tool: ${stepDef.toolCallName}`);
          toolCallCount++;

          const tool = TOOLS_REGISTRY[stepDef.toolCallName];
          const toolCallStartTime = performance.now();
          const toolResult = await tool.execute(stepDef.toolCallArgs || {});
          const toolDuration = Math.round(performance.now() - toolCallStartTime);

          executedToolCall = {
            id: `call_${Date.now()}_${i}`,
            name: stepDef.toolCallName,
            timestamp: new Date().toLocaleTimeString(),
            input: stepDef.toolCallArgs || {},
            output: toolResult,
            durationMs: toolDuration,
            status: 'success',
          };
        }

        // Wait step delay for realistic streaming pacing
        await new Promise((r) => setTimeout(r, stepDef.delayMs));

        // 4. Record step
        totalTokens += stepDef.tokens;
        completedSteps++;
        const elapsedSec = Math.max(0.1, (performance.now() - startTime) / 1000);
        const tokensPerSec = Math.round(totalTokens / elapsedSec);

        const newStep: AgentStep = {
          id: `step_${Date.now()}_${i}`,
          agentId: stepDef.agentId,
          agentName: stepDef.agentName,
          agentRole: stepDef.agentRole,
          timestamp: new Date().toLocaleTimeString(),
          type: stepDef.type,
          content: stepDef.content,
          toolCall: executedToolCall,
          tokens: stepDef.tokens,
          stepIndex: i + 1,
        };

        callbacks.onStepAdded(newStep);

        // 5. Update Telemetry
        const estimatedCost = (totalTokens / 1_000_000) * 0.35; // ~$0.35/1M blended
        callbacks.onTelemetryUpdate({
          totalTokens,
          tokensPerSec,
          executionTimeMs: Math.round(performance.now() - startTime),
          activeAgents: agents.filter((a) => a.status === 'executing' || a.status === 'tool_calling').length,
          completedSteps,
          totalToolCalls: toolCallCount,
          estimatedCost: Number(estimatedCost.toFixed(5)),
          taskSuccessRate: 100,
        });

        // 6. Reset edge animation
        if (relevantEdge) {
          callbacks.onEdgeActiveChange(relevantEdge.id, false);
        }

        // 7. Transition agent to completed if its work in this step is done
        callbacks.onAgentStateChange(stepDef.agentId, 'completed', 'Task phase complete');
      }

      // Mark final artifact ready
      if (!this.abortController.signal.aborted) {
        callbacks.onArtifactReady(plan.finalArtifact);
        callbacks.onComplete();
      }
    } finally {
      this.isRunning = false;
      this.abortController = null;
    }
  }

  public abort(): void {
    if (this.abortController) {
      this.abortController.abort();
      this.isRunning = false;
    }
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }
}

export const orchestratorSingleton = new AgentOrchestrator();
