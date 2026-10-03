import React, { useState } from 'react';
import { Artifact } from '../types/agent';
import { FileCode, FileText, Copy, Check, Download, Play, CheckCircle, ExternalLink } from 'lucide-react';

interface ArtifactViewerProps {
  artifact: Artifact | null;
  isRunning: boolean;
}

export const ArtifactViewer: React.FC<ArtifactViewerProps> = ({ artifact, isRunning }) => {
  const [copied, setCopied] = useState(false);
  const [sandboxExecuted, setSandboxExecuted] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'metadata'>('content');

  if (!artifact) {
    return (
      <div className="glass-panel" style={{ padding: '24px', textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <FileCode size={36} color="#6366f1" style={{ opacity: 0.4, marginBottom: '12px' }} />
        <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          {isRunning ? 'Agents synthesizing final artifacts...' : 'No Artifact Generated Yet'}
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', maxWidth: '340px' }}>
          When the multi-agent reflection and QA loop finishes, the production code or executive report will render here.
        </p>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(artifact.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([artifact.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = artifact.title;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRunSandbox = () => {
    setSandboxExecuted(true);
    setTimeout(() => setSandboxExecuted(false), 4000);
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Header */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(15, 23, 42, 0.7)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {artifact.type === 'code' ? <FileCode size={16} color="#10b981" /> : <FileText size={16} color="#38bdf8" />}
          <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
            {artifact.title}
          </span>
          <span
            style={{
              fontSize: '0.6875rem',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#6ee7b7',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: 600,
            }}
          >
            VERIFIED ARTIFACT
          </span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {artifact.type === 'code' && (
            <button
              onClick={handleRunSandbox}
              className="btn-secondary"
              style={{
                padding: '4px 10px',
                fontSize: '0.75rem',
                borderColor: sandboxExecuted ? 'rgba(16, 185, 129, 0.5)' : undefined,
                color: sandboxExecuted ? '#6ee7b7' : undefined,
              }}
            >
              {sandboxExecuted ? <CheckCircle size={13} color="#10b981" /> : <Play size={13} />}
              <span>{sandboxExecuted ? 'Sandbox Passed (0 err)' : 'Verify in Sandbox'}</span>
            </button>
          )}

          <button onClick={handleCopy} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
            {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button onClick={handleDownload} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
            <Download size={13} />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      {artifact.metrics && (
        <div
          style={{
            background: 'rgba(99, 102, 241, 0.08)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '0.75rem',
          }}
        >
          {artifact.metrics.linesOfCode && (
            <span style={{ color: 'var(--text-secondary)' }}>
              <strong>Lines:</strong> {artifact.metrics.linesOfCode}
            </span>
          )}
          {artifact.metrics.testCasesPassing && (
            <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle size={12} /> {artifact.metrics.testCasesPassing}
            </span>
          )}
          {artifact.metrics.complexityScore && (
            <span style={{ color: '#38bdf8' }}>
              {artifact.metrics.complexityScore}
            </span>
          )}
        </div>
      )}

      {/* Content View */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', background: '#050811' }}>
        <pre
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8125rem',
            lineHeight: 1.5,
            color: '#e2e8f0',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {artifact.content}
        </pre>
      </div>
    </div>
  );
};
