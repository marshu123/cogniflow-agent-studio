export type AgentRole =
  | 'supervisor'
  | 'researcher'
  | 'analyst'
  | 'architect'
  | 'reviewer'
  | 'coder';

export type AgentStatus =
  | 'idle'
  | 'planning'
  | 'executing'
  | 'tool_calling'
  | 'critiquing'
  | 'completed'
  | 'error';

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  avatar: string;
  color: string;
  accentGlow: string;
  status: AgentStatus;
  model: string;
  temperature: number;
  systemPrompt: string;
  tools: string[];
  currentTask?: string;
  completedTasks: number;
  position: { x: number; y: number };
}

export interface ToolCall {
  id: string;
  name: string;
  timestamp: string;
  input: Record<string, any>;
  output?: any;
  durationMs: number;
  status: 'running' | 'success' | 'failed';
}

export interface AgentStep {
  id: string;
  agentId: string;
  agentName: string;
  agentRole: AgentRole;
  timestamp: string;
  type: 'thought' | 'action' | 'observation' | 'critique' | 'synthesis';
  content: string;
  toolCall?: ToolCall;
  tokens: number;
  stepIndex: number;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  active?: boolean;
}

export interface TelemetryMetrics {
  totalTokens: number;
  tokensPerSec: number;
  executionTimeMs: number;
  activeAgents: number;
  completedSteps: number;
  totalToolCalls: number;
  estimatedCost: number;
  taskSuccessRate: number;
}

export interface Artifact {
  id: string;
  title: string;
  type: 'markdown' | 'code' | 'json';
  language?: string;
  content: string;
  generatedBy: string;
  timestamp: string;
  metrics?: {
    linesOfCode?: number;
    testCasesPassing?: string;
    complexityScore?: string;
  };
}

export interface WorkflowPreset {
  id: string;
  title: string;
  badge: string;
  description: string;
  prompt: string;
  agents: Agent[];
  edges: WorkflowEdge[];
  estimatedTime: string;
  defaultArtifactTitle: string;
}
