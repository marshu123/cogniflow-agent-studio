import { describe, it, expect } from 'vitest';
import { TOOLS_REGISTRY } from '../src/services/tools';

describe('Tools Registry Verification', () => {
  it('should have all 5 enterprise autonomous tools registered', () => {
    const registeredToolNames = Object.keys(TOOLS_REGISTRY);
    expect(registeredToolNames).toContain('web_search');
    expect(registeredToolNames).toContain('code_sandbox');
    expect(registeredToolNames).toContain('data_analyzer');
    expect(registeredToolNames).toContain('security_scanner');
    expect(registeredToolNames).toContain('memory_retriever');
  });

  it('web_search tool should execute and return ranked results', async () => {
    const result = await TOOLS_REGISTRY.web_search.execute({ query: 'LLM agents 2026' });
    expect(result.status).toBe(200);
    expect(result.sourcesFound).toBeGreaterThan(0);
    expect(result.results[0].confidence).toBeGreaterThan(0.9);
  });

  it('code_sandbox tool should execute code and return 0 exit code', async () => {
    const result = await TOOLS_REGISTRY.code_sandbox.execute({
      language: 'typescript',
      code: 'console.log("test")',
    });
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Execution successful');
  });

  it('security_scanner should audit target code with zero vulnerabilities', async () => {
    const result = await TOOLS_REGISTRY.security_scanner.execute({
      target: 'payment_pipeline',
      strict_mode: true,
    });
    expect(result.vulnerabilitiesFound).toBe(0);
    expect(result.owaspComplianceScore).toBe('A+');
    expect(result.status).toBe('SECURE_FOR_PRODUCTION');
  });

  it('data_analyzer should compute p95 latency and RPS throughput', async () => {
    const result = await TOOLS_REGISTRY.data_analyzer.execute({
      metric_keys: ['p95LatencyMs', 'throughputRPS'],
      sample_size: 500,
    });
    expect(result.throughputRPS).toBeGreaterThan(1000);
    expect(result.errorRatePercent).toBeLessThan(0.05);
  });
});
