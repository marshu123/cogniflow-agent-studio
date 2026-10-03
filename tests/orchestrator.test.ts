import { describe, it, expect } from 'vitest';
import { WORKFLOW_PRESETS, getScenarioExecutionPlan } from '../src/services/mockEngine';

describe('Workflow Presets & Scenario Engine', () => {
  it('should load all preset configurations with valid agents and edges', () => {
    expect(WORKFLOW_PRESETS.length).toBeGreaterThanOrEqual(2);

    for (const preset of WORKFLOW_PRESETS) {
      expect(preset.id).toBeDefined();
      expect(preset.agents.length).toBeGreaterThanOrEqual(3);
      expect(preset.edges.length).toBeGreaterThanOrEqual(2);

      // Check supervisor is present
      const supervisor = preset.agents.find((a) => a.role === 'supervisor');
      expect(supervisor).toBeDefined();
      expect(supervisor?.name).toBe('Supervisor Core');
    }
  });

  it('getScenarioExecutionPlan should return ordered steps and a valid final artifact for system_architecture', () => {
    const plan = getScenarioExecutionPlan('system_architecture');
    expect(plan.steps.length).toBeGreaterThanOrEqual(5);

    // Verify step sequence contains thought, action, observation
    const stepTypes = plan.steps.map((s) => s.type);
    expect(stepTypes).toContain('thought');
    expect(stepTypes).toContain('action');
    expect(stepTypes).toContain('observation');

    // Verify final artifact
    expect(plan.finalArtifact).toBeDefined();
    expect(plan.finalArtifact.type).toBe('code');
    expect(plan.finalArtifact.content).toContain('ResilientPaymentIngestionEngine');
    expect(plan.finalArtifact.metrics?.testCasesPassing).toBeDefined();
  });

  it('getScenarioExecutionPlan should return executive briefing for market_intel', () => {
    const plan = getScenarioExecutionPlan('market_intel');
    expect(plan.finalArtifact.type).toBe('markdown');
    expect(plan.finalArtifact.content).toContain('Executive Briefing');
  });
});
