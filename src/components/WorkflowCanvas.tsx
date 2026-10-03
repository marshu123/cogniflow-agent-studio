import React from 'react';
import { Agent, WorkflowEdge } from '../types/agent';
import { Bot, Sparkles, CheckCircle2, AlertCircle, Wrench, Shield, Zap } from 'lucide-react';

interface WorkflowCanvasProps {
  agents: Agent[];
  edges: WorkflowEdge[];
  selectedAgentId: string | null;
  onSelectAgent: (agentId: string) => void;
}

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  agents,
  edges,
  selectedAgentId,
  onSelectAgent,
}) => {
  // Helper to get agent coordinate centers
  const getNodeCenter = (agent: Agent) => {
    // Node width: 200, height: ~100
    return {
      x: agent.position.x + 100,
      y: agent.position.y + 50,
    };
  };

  const getRoleIcon = (role: Agent['role']) => {
    switch (role) {
      case 'supervisor':
        return <Zap size={14} color="#6366f1" />;
      case 'architect':
        return <Bot size={14} color="#38bdf8" />;
      case 'coder':
        return <Sparkles size={14} color="#10b981" />;
      case 'reviewer':
        return <Shield size={14} color="#f59e0b" />;
      default:
        return <Bot size={14} color="#a855f7" />;
    }
  };

  return (
    <div className="workflow-canvas-container">
      {/* SVG Canvas for connecting edges */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <defs>
          <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="activeEdgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {edges.map((edge) => {
          const sourceAgent = agents.find((a) => a.id === edge.source);
          const targetAgent = agents.find((a) => a.id === edge.target);
          if (!sourceAgent || !targetAgent) return null;

          const start = getNodeCenter(sourceAgent);
          const target = getNodeCenter(targetAgent);

          // Control point for smooth curved flow
          const deltaY = target.y - start.y;
          const cp1Y = start.y + deltaY * 0.5;
          const cp2Y = target.y - deltaY * 0.5;
          const pathD = `M ${start.x} ${start.y} C ${start.x} ${cp1Y}, ${target.x} ${cp2Y}, ${target.x} ${target.y}`;

          return (
            <g key={edge.id}>
              {/* Background ambient path */}
              <path
                d={pathD}
                fill="none"
                stroke={edge.active ? 'url(#activeEdgeGradient)' : 'rgba(255, 255, 255, 0.12)'}
                strokeWidth={edge.active ? 3 : 1.5}
                strokeDasharray={edge.active ? '6 4' : 'none'}
                filter={edge.active ? 'url(#glowEffect)' : 'none'}
                style={{
                  transition: 'stroke 0.3s ease, stroke-width 0.3s ease',
                  animation: edge.active ? 'dashMove 1s linear infinite' : 'none',
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Agent Nodes */}
      {agents.map((agent) => {
        const isSelected = selectedAgentId === agent.id;
        const isExecuting = agent.status === 'executing' || agent.status === 'tool_calling';

        return (
          <div
            key={agent.id}
            className={`canvas-node ${isSelected ? 'selected' : ''} ${isExecuting ? 'executing' : ''}`}
            style={{
              left: `${agent.position.x}px`,
              top: `${agent.position.y}px`,
              boxShadow: isSelected
                ? `0 0 20px ${agent.accentGlow}`
                : isExecuting
                ? `0 0 25px ${agent.accentGlow}`
                : 'none',
            }}
            onClick={() => onSelectAgent(agent.id)}
          >
            {/* Header: Avatar, Name, Role */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem' }}>{agent.avatar}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
                    {agent.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
                    {getRoleIcon(agent.role)}
                    <span style={{ textTransform: 'capitalize' }}>{agent.role}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Pill */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
              <span className={`status-pill ${agent.status}`}>
                <span
                  className={`pulse-dot ${agent.status === 'executing' || agent.status === 'tool_calling' ? 'pulse' : ''}`}
                  style={{
                    backgroundColor:
                      agent.status === 'completed'
                        ? '#10b981'
                        : agent.status === 'executing'
                        ? '#6366f1'
                        : agent.status === 'tool_calling'
                        ? '#06b6d4'
                        : '#94a3b8',
                  }}
                />
                {agent.status === 'tool_calling' ? 'TOOL CALL' : agent.status}
              </span>

              <span
                style={{
                  fontSize: '0.625rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-muted)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '1px 5px',
                  borderRadius: '4px',
                }}
              >
                {agent.model.replace('gemini-', '')}
              </span>
            </div>

            {/* Current Task if any */}
            {agent.currentTask && (
              <div
                style={{
                  marginTop: '8px',
                  fontSize: '0.6875rem',
                  color: '#cbd5e1',
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '4px 6px',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                }}
                title={agent.currentTask}
              >
                {agent.currentTask}
              </div>
            )}
          </div>
        );
      })}

      {/* Floating Canvas Legend */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '6px 12px',
          fontSize: '0.6875rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 2,
        }}
      >
        <span>DAG Directed Execution</span>
        <span>•</span>
        <span>Click node to inspect</span>
        <span>•</span>
        <span style={{ color: '#38bdf8' }}>Reflection Active</span>
      </div>
    </div>
  );
};
