import React from 'react';
import { Agent } from '../types/agent';
import { Wrench, Shield, Sliders, Database, CheckCircle2, Terminal } from 'lucide-react';
import { TOOLS_REGISTRY } from '../services/tools';

interface AgentInspectorProps {
  agent: Agent | null;
  onClose?: () => void;
}

export const AgentInspector: React.FC<AgentInspectorProps> = ({ agent, onClose }) => {
  if (!agent) {
    return (
      <div className="glass-panel" style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', color: 'var(--text-muted)' }}>
        <Terminal size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
        <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>No Agent Selected</p>
        <p style={{ fontSize: '0.75rem', marginTop: '4px' }}>Click any agent node on the DAG canvas to inspect its persona, tool access, and parameters.</p>
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{ padding: '18px', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Agent Card Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
        <div
          style={{
            fontSize: '1.75rem',
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${agent.accentGlow}`,
          }}
        >
          {agent.avatar}
        </div>
        <div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>{agent.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
            <span style={{ fontSize: '0.6875rem', color: '#38bdf8', textTransform: 'uppercase', fontWeight: 700 }}>
              {agent.role}
            </span>
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>•</span>
            <span style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
              {agent.model}
            </span>
          </div>
        </div>
      </div>

      {/* Configuration & Parameters */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>
          <Sliders size={13} />
          <span>Execution Parameters</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.75rem' }}>
          <div style={{ background: 'var(--bg-input)', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.6875rem' }}>Temperature</div>
            <div style={{ fontWeight: 600, fontFamily: 'var(--font-mono)', marginTop: '2px' }}>{agent.temperature}</div>
          </div>
          <div style={{ background: 'var(--bg-input)', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.6875rem' }}>Status</div>
            <div style={{ fontWeight: 600, textTransform: 'capitalize', color: agent.status === 'completed' ? '#10b981' : '#a5b4fc', marginTop: '2px' }}>
              {agent.status}
            </div>
          </div>
        </div>
      </div>

      {/* System Prompt / Persona */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>
          System Persona & Prompt
        </div>
        <div
          style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '0.75rem',
            color: '#cbd5e1',
            lineHeight: 1.45,
            fontStyle: 'italic',
          }}
        >
          "{agent.systemPrompt}"
        </div>
      </div>

      {/* Allowed Tools */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '8px' }}>
          <Wrench size={13} />
          <span>Equipped Tools ({agent.tools.length})</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {agent.tools.map((toolName) => {
            const toolDef = TOOLS_REGISTRY[toolName];
            return (
              <div
                key={toolName}
                style={{
                  background: 'rgba(6, 182, 212, 0.05)',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  borderRadius: '6px',
                  padding: '8px 10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="tool-chip">{toolName}</span>
                  <span style={{ fontSize: '0.6875rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <CheckCircle2 size={11} /> Bound
                  </span>
                </div>
                {toolDef && (
                  <p style={{ fontSize: '0.6875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {toolDef.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
