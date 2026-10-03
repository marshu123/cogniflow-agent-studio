import React from 'react';
import { TelemetryMetrics } from '../types/agent';
import { Activity, Zap, DollarSign, Clock, CheckCircle2, Cpu, Wrench } from 'lucide-react';

interface TelemetryPanelProps {
  telemetry: TelemetryMetrics;
  isRunning: boolean;
}

export const TelemetryPanel: React.FC<TelemetryPanelProps> = ({ telemetry, isRunning }) => {
  return (
    <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Telemetry Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={16} color="#06b6d4" />
          <span style={{ fontWeight: 700, fontSize: '0.8125rem', color: 'var(--text-primary)' }}>
            Live Swarm Telemetry
          </span>
        </div>
        {isRunning && (
          <span style={{ fontSize: '0.6875rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className="pulse-dot pulse" style={{ backgroundColor: '#10b981' }} />
            PROCESSING
          </span>
        )}
      </div>

      {/* Metrics 4-Box Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {/* Token Velocity */}
        <div className="metric-box">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="metric-label">Velocity</span>
            <Zap size={14} color="#6366f1" />
          </div>
          <div className="metric-val" style={{ color: '#a5b4fc' }}>
            {telemetry.tokensPerSec}
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, marginLeft: '4px' }}>
              tok/s
            </span>
          </div>
        </div>

        {/* Total Tokens */}
        <div className="metric-box">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="metric-label">Cumulative Tokens</span>
            <Cpu size={14} color="#38bdf8" />
          </div>
          <div className="metric-val">
            {telemetry.totalTokens.toLocaleString()}
          </div>
        </div>

        {/* Execution Wall Clock Latency */}
        <div className="metric-box">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="metric-label">Wall Latency</span>
            <Clock size={14} color="#f59e0b" />
          </div>
          <div className="metric-val">
            {(telemetry.executionTimeMs / 1000).toFixed(1)}
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500, marginLeft: '4px' }}>
              sec
            </span>
          </div>
        </div>

        {/* Cost & Efficiency */}
        <div className="metric-box">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="metric-label">Estimated OPEX</span>
            <DollarSign size={14} color="#10b981" />
          </div>
          <div className="metric-val" style={{ color: '#6ee7b7' }}>
            ${telemetry.estimatedCost.toFixed(4)}
          </div>
        </div>
      </div>

      {/* Secondary Sub-Metrics Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid var(--border-subtle)',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: 'var(--text-muted)' }}>Tool Calls:</span>
          <span style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', color: '#67e8f9' }}>
            {telemetry.totalToolCalls}
          </span>
        </div>
        <div style={{ color: 'var(--border-subtle)' }}>|</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: 'var(--text-muted)' }}>Quality Pass Rate:</span>
          <span style={{ fontWeight: 700, color: '#10b981' }}>{telemetry.taskSuccessRate}%</span>
        </div>
        <div style={{ color: 'var(--border-subtle)' }}>|</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ color: 'var(--text-muted)' }}>Reflection Loops:</span>
          <span style={{ fontWeight: 700, color: '#ec4899' }}>Verified</span>
        </div>
      </div>
    </div>
  );
};
