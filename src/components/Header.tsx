import React from 'react';
import { Cpu, Play, Square, Key, Sparkles, Download, CheckCircle2, Code2 } from 'lucide-react';
import { WORKFLOW_PRESETS } from '../services/mockEngine';

interface HeaderProps {
  isRunning: boolean;
  selectedPresetId: string;
  onSelectPreset: (id: string) => void;
  onStartWorkflow: () => void;
  onStopWorkflow: () => void;
  onOpenSettings: () => void;
  hasArtifact: boolean;
  onExportArtifact: () => void;
  hasApiKey: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  isRunning,
  selectedPresetId,
  onSelectPreset,
  onStartWorkflow,
  onStopWorkflow,
  onOpenSettings,
  hasArtifact,
  onExportArtifact,
  hasApiKey,
}) => {
  return (
    <header className="app-header">
      {/* Brand & Logo */}
      <div className="logo-badge">
        <div className="logo-icon-box">
          <Cpu size={22} color="#ffffff" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em' }} className="title-gradient">
              CogniFlow
            </span>
            <span
              style={{
                fontSize: '0.6875rem',
                fontWeight: 700,
                padding: '2px 6px',
                borderRadius: '4px',
                background: 'rgba(99, 102, 241, 0.2)',
                color: '#a5b4fc',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                letterSpacing: '0.04em',
              }}
            >
              STUDIO
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Autonomous Multi-Agent Orchestration & Workflow Intelligence
          </p>
        </div>
      </div>

      {/* Preset Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>SCENARIO:</span>
        <select
          value={selectedPresetId}
          onChange={(e) => onSelectPreset(e.target.value)}
          disabled={isRunning}
          style={{
            background: 'var(--bg-input)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-subtle)',
            padding: '7px 12px',
            borderRadius: '8px',
            fontSize: '0.8125rem',
            outline: 'none',
            cursor: isRunning ? 'not-allowed' : 'pointer',
          }}
        >
          {WORKFLOW_PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              [{p.badge}] {p.title}
            </option>
          ))}
        </select>
      </div>

      {/* Control Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Settings / API Key */}
        <button
          onClick={onOpenSettings}
          className="btn-secondary"
          title="Configure Gemini API Key or Simulation Mode"
          style={{ padding: '6px 12px' }}
        >
          <Key size={14} color={hasApiKey ? '#10b981' : '#94a3b8'} />
          <span style={{ fontSize: '0.8125rem' }}>{hasApiKey ? 'Gemini Live' : 'Simulation Mode'}</span>
        </button>

        {/* Export Artifact */}
        {hasArtifact && (
          <button
            onClick={onExportArtifact}
            className="btn-secondary"
            title="Download Generated Output"
            style={{ padding: '6px 12px' }}
          >
            <Download size={14} />
            <span style={{ fontSize: '0.8125rem' }}>Export</span>
          </button>
        )}

        {/* GitHub Link */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="btn-secondary"
          title="View GitHub Repository"
          style={{ textDecoration: 'none', padding: '6px 10px', display: 'inline-flex', alignItems: 'center' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>

        {/* Execution Trigger */}
        {isRunning ? (
          <button onClick={onStopWorkflow} className="btn-secondary" style={{ borderColor: 'rgba(244, 63, 94, 0.4)', color: '#fda4af' }}>
            <Square size={14} fill="#f43f5e" />
            <span>Abort Swarm</span>
          </button>
        ) : (
          <button onClick={onStartWorkflow} className="btn-primary">
            <Play size={14} fill="#ffffff" />
            <span>Execute Workflow</span>
          </button>
        )}
      </div>
    </header>
  );
};
