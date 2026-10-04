import React, { useState, useEffect, useRef } from 'react';
import { AgentStep } from '../types/agent';
import { Terminal, ChevronDown, ChevronRight, Copy, Check, Filter, Sparkles, Wrench, Shield, CheckCircle } from 'lucide-react';

interface StreamingConsoleProps {
  steps: AgentStep[];
  isRunning: boolean;
}

export const StreamingConsole: React.FC<StreamingConsoleProps> = ({ steps, isRunning }) => {
  const [filter, setFilter] = useState<'all' | 'thought' | 'action' | 'critique'>('all');
  const [expandedStepIds, setExpandedStepIds] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Scroll the console itself, not the document. scrollIntoView() walks up to
  // the viewport as well, which dragged the whole page down mid-stream.
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
  }, [steps]);

  const toggleExpand = (id: string) => {
    setExpandedStepIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredSteps = steps.filter((step) => {
    if (filter === 'all') return true;
    return step.type === filter;
  });

  const handleCopyLogs = () => {
    const rawText = steps
      .map((s) => `[${s.timestamp}] [${s.agentName} - ${s.type.toUpperCase()}]: ${s.content}`)
      .join('\n');
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStepBadge = (type: AgentStep['type']) => {
    switch (type) {
      case 'thought':
        return <span style={{ color: '#a5b4fc', background: 'rgba(99, 102, 241, 0.15)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.6875rem' }}>THINKING</span>;
      case 'action':
        return <span style={{ color: '#67e8f9', background: 'rgba(6, 182, 212, 0.15)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.6875rem' }}>ACTION</span>;
      case 'observation':
        return <span style={{ color: '#6ee7b7', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.6875rem' }}>OBSERVATION</span>;
      case 'critique':
        return <span style={{ color: '#fbcfe8', background: 'rgba(236, 72, 153, 0.15)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.6875rem' }}>CRITIQUE</span>;
      case 'synthesis':
        return <span style={{ color: '#fde68a', background: 'rgba(245, 158, 11, 0.15)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.6875rem' }}>SYNTHESIS</span>;
    }
  };

  return (
    <div className="terminal-view">
      {/* Console Header */}
      <div className="terminal-header console-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flexWrap: 'wrap' }}>
          <Terminal size={15} color="#38bdf8" />
          <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
            Real-Time Streaming Execution Console
          </span>
          {isRunning && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.6875rem', color: '#6366f1' }}>
              <span className="pulse-dot pulse" style={{ backgroundColor: '#6366f1' }} />
              STREAMING TOKENS
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* Filters */}
          <div className="console-filters">
            {(['all', 'thought', 'action', 'critique'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`console-filter-btn ${filter === tab ? 'active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Copy Button */}
          <button onClick={handleCopyLogs} className="console-icon-btn" title="Copy trace log" aria-label="Copy trace log">
            {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
          </button>
        </div>
      </div>

      {/* Console Stream Body */}
      <div className="terminal-body" ref={bodyRef}>
        {filteredSteps.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 0', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            {isRunning ? 'Initiating supervisor task decomposition...' : 'Console idle. Click "Execute Workflow" to stream agent execution.'}
          </div>
        ) : (
          filteredSteps.map((step) => {
            const isExpanded = !!expandedStepIds[step.id];

            return (
              <div
                key={step.id}
                className="animate-fade-in"
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                {/* Step Metadata Bar */}
                <div className="step-meta">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      #{step.stepIndex}
                    </span>
                    <span style={{ fontWeight: 600, fontSize: '0.75rem', color: '#e2e8f0' }}>
                      {step.agentName}
                    </span>
                    {getStepBadge(step.type)}
                  </div>

                  <span className="step-meta-right">
                    {step.tokens} tokens • {step.timestamp}
                  </span>
                </div>

                {/* Content Message */}
                <div style={{ fontSize: '0.8125rem', color: '#f1f5f9', lineHeight: 1.45 }}>
                  {step.content}
                </div>

                {/* Tool Invocation Inspector if Present */}
                {step.toolCall && (
                  <div
                    style={{
                      marginTop: '6px',
                      background: 'rgba(6, 182, 212, 0.06)',
                      border: '1px solid rgba(6, 182, 212, 0.25)',
                      borderRadius: '6px',
                      padding: '8px 10px',
                    }}
                  >
                    <div
                      onClick={() => toggleExpand(step.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {isExpanded ? <ChevronDown size={13} color="#38bdf8" /> : <ChevronRight size={13} color="#38bdf8" />}
                        <span className="tool-chip">{step.toolCall.name}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.6875rem' }}>
                          completed in {step.toolCall.durationMs}ms
                        </span>
                      </div>
                      <span style={{ color: '#10b981', fontSize: '0.6875rem', fontWeight: 600 }}>200 OK</span>
                    </div>

                    {isExpanded && (
                      <div
                        style={{
                          marginTop: '8px',
                          paddingTop: '8px',
                          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                          fontSize: '0.6875rem',
                        }}
                      >
                        <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>// Arguments</div>
                        <pre style={{ background: 'rgba(0,0,0,0.4)', padding: '6px', borderRadius: '4px', overflowX: 'auto' }}>
                          {JSON.stringify(step.toolCall.input, null, 2)}
                        </pre>

                        <div style={{ color: 'var(--text-muted)', margin: '6px 0 4px' }}>// Returned Payload</div>
                        <pre style={{ background: 'rgba(0,0,0,0.4)', padding: '6px', borderRadius: '4px', overflowX: 'auto', color: '#67e8f9' }}>
                          {JSON.stringify(step.toolCall.output, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
