import React, { useState } from 'react';
import { X, Key, CheckCircle2, AlertCircle, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { GeminiService } from '../services/geminiClient';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey,
}) => {
  const [inputKey, setInputKey] = useState(apiKey);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'failed' | null>(null);

  if (!isOpen) return null;

  const handleTestKey = async () => {
    if (!inputKey.trim()) return;
    setTesting(true);
    setTestResult(null);

    const ok = await GeminiService.testApiKey(inputKey.trim());
    setTesting(false);
    setTestResult(ok ? 'success' : 'failed');
  };

  const handleSave = () => {
    onSaveApiKey(inputKey.trim());
    onClose();
  };

  const handleUseSimulation = () => {
    onSaveApiKey('');
    setInputKey('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '16px' }}>
          <div className="modal-title-row">
            <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '6px', borderRadius: '8px', flexShrink: 0 }}>
              <Key size={18} color="#6366f1" />
            </div>
            <div style={{ minWidth: 0 }}>
              <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Runtime Model & API Configuration
              </h2>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Connect live Google Gemini API or use the built-in deterministic simulation swarm.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close" aria-label="Close settings">
            <X size={18} />
          </button>
        </div>

        {/* Informative Banner */}
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '10px',
            padding: '12px',
            marginBottom: '16px',
            fontSize: '0.8125rem',
            color: '#6ee7b7',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
          }}
        >
          <ShieldCheck size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Zero API Key Required For Demo:</strong>
            <p style={{ color: '#a7f3d0', fontSize: '0.75rem', marginTop: '2px' }}>
              CogniFlow includes an enterprise mock swarm engine with real tool telemetry, deterministic multi-agent thinking traces, and verified code artifacts. Recruiters can test immediately without setup.
            </p>
          </div>
        </div>

        {/* Input */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Google Gemini API Key (Optional)
          </label>
          <div className="modal-input-row">
            <input
              type="password"
              placeholder="AIzaSy..."
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="modal-input"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
            />
            <button
              onClick={handleTestKey}
              disabled={testing || !inputKey.trim()}
              className="btn-secondary"
            >
              {testing ? 'Testing...' : 'Verify'}
            </button>
          </div>

          {testResult === 'success' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '0.75rem', marginTop: '6px' }}>
              <CheckCircle2 size={13} />
              <span>Gemini 2.5 API Key verified and active!</span>
            </div>
          )}

          {testResult === 'failed' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f43f5e', fontSize: '0.75rem', marginTop: '6px' }}>
              <AlertCircle size={13} />
              <span>Invalid API key or network connection failed.</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="modal-actions">
          <button onClick={handleUseSimulation} className="modal-text-reset">
            Clear / Revert to Swarm Simulation
          </button>

          <div className="modal-actions-right">
            <button onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button onClick={handleSave} className="btn-primary">
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
