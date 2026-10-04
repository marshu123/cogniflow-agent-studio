import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { WorkflowCanvas } from './components/WorkflowCanvas';
import { AgentInspector } from './components/AgentInspector';
import { StreamingConsole } from './components/StreamingConsole';
import { TelemetryPanel } from './components/TelemetryPanel';
import { ArtifactViewer } from './components/ArtifactViewer';
import { ApiKeyModal } from './components/ApiKeyModal';
import { WORKFLOW_PRESETS } from './services/mockEngine';
import { Agent, AgentStep, Artifact, TelemetryMetrics, WorkflowEdge } from './types/agent';
import { orchestratorSingleton } from './services/orchestrator';

export const App: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('system_architecture');
  const activePreset = WORKFLOW_PRESETS.find((p) => p.id === selectedPresetId) || WORKFLOW_PRESETS[0];

  const [agents, setAgents] = useState<Agent[]>(activePreset.agents);
  const [edges, setEdges] = useState<WorkflowEdge[]>(activePreset.edges);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(activePreset.agents[0]?.id || null);

  const [steps, setSteps] = useState<AgentStep[]>([]);
  const [artifact, setArtifact] = useState<Artifact | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('COGNIFLOW_GEMINI_API_KEY') || '');

  const [telemetry, setTelemetry] = useState<TelemetryMetrics>({
    totalTokens: 0,
    tokensPerSec: 0,
    executionTimeMs: 0,
    activeAgents: 0,
    completedSteps: 0,
    totalToolCalls: 0,
    estimatedCost: 0,
    taskSuccessRate: 100,
  });

  // Switch presets
  const handleSelectPreset = (presetId: string) => {
    if (isRunning) return;
    setSelectedPresetId(presetId);
    const newPreset = WORKFLOW_PRESETS.find((p) => p.id === presetId) || WORKFLOW_PRESETS[0];
    setAgents(newPreset.agents);
    setEdges(newPreset.edges);
    setSelectedAgentId(newPreset.agents[0]?.id || null);
    setSteps([]);
    setArtifact(null);
    setTelemetry({
      totalTokens: 0,
      tokensPerSec: 0,
      executionTimeMs: 0,
      activeAgents: 0,
      completedSteps: 0,
      totalToolCalls: 0,
      estimatedCost: 0,
      taskSuccessRate: 100,
    });
  };

  // Start workflow execution
  const handleStartWorkflow = useCallback(async () => {
    if (isRunning) return;
    setIsRunning(true);
    setSteps([]);
    setArtifact(null);

    // Initial telemetry reset
    setTelemetry({
      totalTokens: 0,
      tokensPerSec: 0,
      executionTimeMs: 0,
      activeAgents: agents.length,
      completedSteps: 0,
      totalToolCalls: 0,
      estimatedCost: 0,
      taskSuccessRate: 100,
    });

    await orchestratorSingleton.runWorkflow(selectedPresetId, agents, edges, {
      onStepAdded: (newStep) => {
        setSteps((prev) => [...prev, newStep]);
      },
      onAgentStateChange: (agentId, status, currentTask) => {
        setAgents((prev) =>
          prev.map((a) => (a.id === agentId ? { ...a, status, currentTask } : a))
        );
      },
      onEdgeActiveChange: (edgeId, active) => {
        setEdges((prev) =>
          prev.map((e) => (e.id === edgeId ? { ...e, active } : e))
        );
      },
      onTelemetryUpdate: (newTelemetry) => {
        setTelemetry(newTelemetry);
      },
      onArtifactReady: (readyArtifact) => {
        setArtifact(readyArtifact);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#6366f1', '#38bdf8', '#10b981'],
        });
      },
      onComplete: () => {
        setIsRunning(false);
      },
    });

    setIsRunning(false);
  }, [isRunning, selectedPresetId, agents, edges]);

  const handleStopWorkflow = () => {
    orchestratorSingleton.abort();
    setIsRunning(false);
  };

  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('COGNIFLOW_GEMINI_API_KEY', key);
  };

  // Keyboard shortcut (Ctrl+Enter or Cmd+Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (!isRunning) {
          handleStartWorkflow();
        } else {
          handleStopWorkflow();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, handleStartWorkflow]);

  const selectedAgent = agents.find((a) => a.id === selectedAgentId) || null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-app)' }}>
      {/* Top Header */}
      <Header
        isRunning={isRunning}
        selectedPresetId={selectedPresetId}
        onSelectPreset={handleSelectPreset}
        onStartWorkflow={handleStartWorkflow}
        onStopWorkflow={handleStopWorkflow}
        onOpenSettings={() => setIsSettingsOpen(true)}
        hasArtifact={!!artifact}
        onExportArtifact={() => {
          if (!artifact) return;
          const blob = new Blob([artifact.content], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = artifact.title;
          a.click();
        }}
        hasApiKey={!!apiKey}
      />

      {/* Main Workspace Layout */}
      <main className="app-main">
        {/* Preset Directive Banner */}
        <div className="glass-panel objective-banner">
          <div className="objective-banner-body">
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                background: 'rgba(99, 102, 241, 0.2)',
                color: '#a5b4fc',
                padding: '4px 8px',
                borderRadius: '6px',
              }}
            >
              ACTIVE OBJECTIVE
            </span>
            <span className="objective-prompt">{activePreset.prompt}</span>
          </div>

          <div className="objective-banner-meta">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Est. Execution: <strong style={{ color: '#38bdf8' }}>{activePreset.estimatedTime}</strong>
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Agents: <strong style={{ color: '#10b981' }}>{agents.length} active</strong>
            </span>
          </div>
        </div>

        {/* Section 1: DAG Canvas & Agent Inspector */}
        <div className="split-layout">
          <div className="canvas-scroll">
            <WorkflowCanvas
              agents={agents}
              edges={edges}
              selectedAgentId={selectedAgentId}
              onSelectAgent={setSelectedAgentId}
            />
          </div>
          <div className="inspector-slot">
            <AgentInspector agent={selectedAgent} />
          </div>
        </div>

        {/* Section 2: Real-Time Swarm Telemetry */}
        <TelemetryPanel telemetry={telemetry} isRunning={isRunning} />

        {/* Section 3: Dual Output - Streaming Console & Artifact Viewer */}
        <div className="dual-layout">
          <StreamingConsole steps={steps} isRunning={isRunning} />
          <ArtifactViewer artifact={artifact} isRunning={isRunning} />
        </div>
      </main>

      {/* API Key & Model Settings Modal */}
      <ApiKeyModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />
    </div>
  );
};

export default App;
