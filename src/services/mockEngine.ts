import { Agent, AgentStep, Artifact, WorkflowEdge, WorkflowPreset } from '../types/agent';
import { TOOLS_REGISTRY } from './tools';

export const WORKFLOW_PRESETS: WorkflowPreset[] = [
  {
    id: 'system_architecture',
    title: 'Distributed System Architecture & Idempotent Engine',
    badge: 'Enterprise Backend',
    description: 'Autonomous multi-agent orchestration designing a 50k TPS fault-tolerant payment pipeline with transactional outbox and distributed locking.',
    prompt: 'Design and synthesize a production-grade, event-driven payment ingestion service capable of handling 50,000 TPS with Redis distributed locks, transactional outbox pattern, and strict idempotent guarantees.',
    estimatedTime: '6.4s',
    defaultArtifactTitle: 'PaymentPipeline_OutboxService.ts',
    agents: [
      {
        id: 'agent_supervisor',
        name: 'Supervisor Core',
        role: 'supervisor',
        avatar: '⚡',
        color: '#6366f1',
        accentGlow: 'rgba(99, 102, 241, 0.4)',
        status: 'idle',
        model: 'gemini-2.5-pro',
        temperature: 0.2,
        systemPrompt: 'You are the Chief AI Orchestrator. Decompose high-level engineering objectives into DAG subtasks, assign specialist agents, and enforce quality gates.',
        tools: ['memory_retriever'],
        completedTasks: 0,
        position: { x: 380, y: 40 },
      },
      {
        id: 'agent_architect',
        name: 'System Architect',
        role: 'architect',
        avatar: '📐',
        color: '#38bdf8',
        accentGlow: 'rgba(56, 189, 248, 0.4)',
        status: 'idle',
        model: 'gemini-2.5-flash',
        temperature: 0.3,
        systemPrompt: 'Senior Distributed Systems Architect. Formulate data schemas, state machines, Kafka partition strategies, and CAP theorem trade-offs.',
        tools: ['memory_retriever', 'web_search'],
        completedTasks: 0,
        position: { x: 120, y: 190 },
      },
      {
        id: 'agent_coder',
        name: 'Principal Coder',
        role: 'coder',
        avatar: '💻',
        color: '#10b981',
        accentGlow: 'rgba(16, 185, 129, 0.4)',
        status: 'idle',
        model: 'gemini-2.5-flash',
        temperature: 0.2,
        systemPrompt: 'Principal TypeScript/Go Engineer. Implement resilient, thread-safe, memory-safe code with robust error boundaries and typing.',
        tools: ['code_sandbox'],
        completedTasks: 0,
        position: { x: 380, y: 190 },
      },
      {
        id: 'agent_security',
        name: 'Security Auditor',
        role: 'reviewer',
        avatar: '🛡️',
        color: '#f59e0b',
        accentGlow: 'rgba(245, 158, 11, 0.4)',
        status: 'idle',
        model: 'gemini-2.5-flash',
        temperature: 0.1,
        systemPrompt: 'Infosec & Reliability Specialist. Enforce OWASP standards, race condition detection, timing attack mitigation, and token validation.',
        tools: ['security_scanner', 'data_analyzer'],
        completedTasks: 0,
        position: { x: 640, y: 190 },
      },
      {
        id: 'agent_critic',
        name: 'Benchmark Critic',
        role: 'reviewer',
        avatar: '⚖️',
        color: '#ec4899',
        accentGlow: 'rgba(236, 72, 153, 0.4)',
        status: 'idle',
        model: 'gemini-2.5-flash',
        temperature: 0.1,
        systemPrompt: 'Performance & QA Critic. Conduct formal verification, calculate p99 SLA confidence intervals, and approve production readiness.',
        tools: ['data_analyzer', 'code_sandbox'],
        completedTasks: 0,
        position: { x: 380, y: 340 },
      },
    ],
    edges: [
      { id: 'e1', source: 'agent_supervisor', target: 'agent_architect', label: 'Decomposes spec' },
      { id: 'e2', source: 'agent_supervisor', target: 'agent_coder', label: 'Assigns implementation' },
      { id: 'e3', source: 'agent_supervisor', target: 'agent_security', label: 'Enforces security gate' },
      { id: 'e4', source: 'agent_architect', target: 'agent_coder', label: 'Schema handover' },
      { id: 'e5', source: 'agent_coder', target: 'agent_critic', label: 'Code submission' },
      { id: 'e6', source: 'agent_security', target: 'agent_critic', label: 'Audit report' },
    ],
  },
  {
    id: 'market_intel',
    title: 'Autonomous Competitor & Market Intelligence',
    badge: 'AI Research & Quant',
    description: 'Dispatches deep-web search agents and quantitative statistical models to synthesize competitor positioning and compute unit economics.',
    prompt: 'Synthesize an institutional-grade intelligence analysis comparing the top 4 GenAI inference cloud platforms in 2026, evaluating token throughput, p95 latency, enterprise SLAs, and pricing per million tokens.',
    estimatedTime: '5.2s',
    defaultArtifactTitle: 'GenAI_Inference_Market_Report_2026.md',
    agents: [
      {
        id: 'agent_supervisor',
        name: 'Supervisor Core',
        role: 'supervisor',
        avatar: '⚡',
        color: '#6366f1',
        accentGlow: 'rgba(99, 102, 241, 0.4)',
        status: 'idle',
        model: 'gemini-2.5-pro',
        temperature: 0.2,
        systemPrompt: 'Direct research agents, extract key metric dimensions, and assemble executive briefings.',
        tools: ['memory_retriever'],
        completedTasks: 0,
        position: { x: 380, y: 40 },
      },
      {
        id: 'agent_researcher',
        name: 'Deep Web Researcher',
        role: 'researcher',
        avatar: '🔍',
        color: '#38bdf8',
        accentGlow: 'rgba(56, 189, 248, 0.4)',
        status: 'idle',
        model: 'gemini-2.5-flash',
        temperature: 0.4,
        systemPrompt: 'Scour technical blogs, investor disclosures, benchmarks, and GitHub telemetry.',
        tools: ['web_search'],
        completedTasks: 0,
        position: { x: 200, y: 200 },
      },
      {
        id: 'agent_analyst',
        name: 'Quantitative Analyst',
        role: 'analyst',
        avatar: '📊',
        color: '#10b981',
        accentGlow: 'rgba(16, 185, 129, 0.4)',
        status: 'idle',
        model: 'gemini-2.5-flash',
        temperature: 0.2,
        systemPrompt: 'Compute variance models, token cost efficiency, and regression projections.',
        tools: ['data_analyzer'],
        completedTasks: 0,
        position: { x: 560, y: 200 },
      },
      {
        id: 'agent_synthesizer',
        name: 'Executive Synthesizer',
        role: 'reviewer',
        avatar: '📑',
        color: '#ec4899',
        accentGlow: 'rgba(236, 72, 153, 0.4)',
        status: 'idle',
        model: 'gemini-2.5-pro',
        temperature: 0.3,
        systemPrompt: 'Condense complex data into high-signal strategic insights for C-level leadership.',
        tools: ['memory_retriever'],
        completedTasks: 0,
        position: { x: 380, y: 350 },
      },
    ],
    edges: [
      { id: 'e1', source: 'agent_supervisor', target: 'agent_researcher', label: 'Query assignment' },
      { id: 'e2', source: 'agent_supervisor', target: 'agent_analyst', label: 'Metric parameters' },
      { id: 'e3', source: 'agent_researcher', target: 'agent_synthesizer', label: 'Raw findings' },
      { id: 'e4', source: 'agent_analyst', target: 'agent_synthesizer', label: 'Statistical modeling' },
    ],
  },
];

export interface ScenarioExecutionPlan {
  steps: {
    agentId: string;
    agentName: string;
    agentRole: any;
    type: 'thought' | 'action' | 'observation' | 'critique' | 'synthesis';
    content: string;
    toolCallName?: string;
    toolCallArgs?: Record<string, any>;
    tokens: number;
    delayMs: number;
  }[];
  finalArtifact: Artifact;
}

export function getScenarioExecutionPlan(presetId: string): ScenarioExecutionPlan {
  if (presetId === 'market_intel') {
    return {
      steps: [
        {
          agentId: 'agent_supervisor',
          agentName: 'Supervisor Core',
          agentRole: 'supervisor',
          type: 'thought',
          content: 'Task initiated: Ingest user research directive. Dissecting research queries across 4 dimensions: Compute Architecture, Token Pricing, P95 TTFT (Time-to-First-Token), and Enterprise SLA compliance.',
          tokens: 184,
          delayMs: 600,
        },
        {
          agentId: 'agent_researcher',
          agentName: 'Deep Web Researcher',
          agentRole: 'researcher',
          type: 'action',
          content: 'Dispatching web_search queries against indexed cloud providers and independent LLM benchmarks (LMSYS, Artificial Analysis, SemiAnalysis).',
          toolCallName: 'web_search',
          toolCallArgs: { query: 'LLM inference provider benchmark p95 latency tokens per second 2026', num_results: 5 },
          tokens: 240,
          delayMs: 750,
        },
        {
          agentId: 'agent_researcher',
          agentName: 'Deep Web Researcher',
          agentRole: 'researcher',
          type: 'observation',
          content: 'Observed benchmarks: Provider A averages 142 tok/s with $0.40/M input tokens; Provider B leads on speculative decoding with 210 tok/s at $0.35/M; Provider C offers dedicated VPC private tenants with 99.999% uptime guarantees.',
          tokens: 310,
          delayMs: 650,
        },
        {
          agentId: 'agent_analyst',
          agentName: 'Quantitative Analyst',
          agentRole: 'analyst',
          type: 'action',
          content: 'Invoking data_analyzer to model total cost of ownership (TCO) across 1B token/month enterprise workload including peak concurrency spikes.',
          toolCallName: 'data_analyzer',
          toolCallArgs: { metric_keys: ['throughputRPS', 'p95LatencyMs', 'costPerMillion'], sample_size: 5000 },
          tokens: 290,
          delayMs: 800,
        },
        {
          agentId: 'agent_analyst',
          agentName: 'Quantitative Analyst',
          agentRole: 'analyst',
          type: 'observation',
          content: 'TCO Simulation Complete: Speculative decoding clusters reduce monthly inference OPEX by 37.4%. P99 variance stays bounded below 120ms even under 10x traffic bursts.',
          tokens: 260,
          delayMs: 700,
        },
        {
          agentId: 'agent_synthesizer',
          agentName: 'Executive Synthesizer',
          agentRole: 'reviewer',
          type: 'synthesis',
          content: 'Compiling structured executive briefing: "2026 Cloud AI Inference Benchmark & Strategic Procurement Matrix". Embedding verified data tables, cost models, and vendor risk scores.',
          tokens: 420,
          delayMs: 850,
        },
      ],
      finalArtifact: {
        id: 'art_market_intel_01',
        title: 'GenAI_Inference_Market_Report_2026.md',
        type: 'markdown',
        language: 'markdown',
        generatedBy: 'CogniFlow Autonomous Multi-Agent Swarm',
        timestamp: new Date().toISOString(),
        metrics: {
          linesOfCode: 148,
          testCasesPassing: '4/4 Data Checks Verified',
          complexityScore: 'High Strategic Signal',
        },
        content: `# Executive Briefing: Cloud GenAI Inference Platforms (2026 Benchmark)

**Prepared by:** CogniFlow Autonomous Intelligence Swarm  
**Target Audience:** CTO / VP of Infrastructure & Enterprise AI Architects  
**Confidence Score:** 98.4% (Multi-source cross-validated)

---

## 1. Executive Summary
Enterprise LLM inference has shifted from raw FLOPS to **effective latency per reasoning token** and **speculative draft-model efficiency**. Cloud providers employing hardware-accelerated speculative decoding show a **37.4% reduction in overall TCO** while maintaining sub-100ms TTFT (Time-To-First-Token).

---

## 2. Quantitative Comparative Matrix

| Provider / Tier | Throughput (tok/s) | p95 TTFT (ms) | Input $/M tok | Output $/M tok | SLA Guarantee |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Provider Alpha (Flash Tier)** | 218 tok/s | 68 ms | $0.15 | $0.60 | 99.99% |
| **Provider Beta (Pro/MoE Tier)** | 165 tok/s | 94 ms | $0.35 | $1.05 | 99.95% |
| **Dedicated Private Tenant** | 240 tok/s | 52 ms | Flat Cluster | Flat Cluster | 99.999% |
| **Open Source Self-Hosted vLLM** | 185 tok/s | 110 ms | $0.22 (amortized)| $0.22 | Internal DevOps |

---

## 3. Key Architectural Recommendations
1. **Tiered Routing Architecture:** Route 75% of zero-shot retrieval requests to lightweight flash models (sub-70ms TTFT) and fall back to reasoning models with extended thinking for ambiguous queries.
2. **Deterministic Fallbacks:** Implement client-side exponential backoff with jitter and cross-region hedge requests after 400ms threshold.
3. **KV Cache Multiplexing:** Utilize prefix caching for repetitive system prompts to unlock 80% input token cost savings.
`,
      },
    };
  }

  // Default: system_architecture
  return {
    steps: [
      {
        agentId: 'agent_supervisor',
        agentName: 'Supervisor Core',
        agentRole: 'supervisor',
        type: 'thought',
        content: 'Evaluating payment pipeline requirements: 50,000 TPS, zero data loss, strict idempotency, p99 < 15ms. Initializing DAG workflow: Dispatching System Architect for state machine & schema, Principal Coder for implementation, and Security Auditor for zero-trust boundary verification.',
        tokens: 210,
        delayMs: 650,
      },
      {
        agentId: 'agent_architect',
        agentName: 'System Architect',
        agentRole: 'architect',
        type: 'action',
        content: 'Querying internal architectural memory store for distributed locking patterns and Transactional Outbox consistency guarantees.',
        toolCallName: 'memory_retriever',
        toolCallArgs: { key_concept: 'transactional_outbox_redis_redlock_consistency' },
        tokens: 285,
        delayMs: 700,
      },
      {
        agentId: 'agent_architect',
        agentName: 'System Architect',
        agentRole: 'architect',
        type: 'observation',
        content: 'Architecture defined: Dual-phase ingestion with Redis Lua script for sub-millisecond atomic idempotency check, PostgreSQL for ACID outbox table insert, and Debezium CDC streaming to Kafka payment partition topic.',
        tokens: 340,
        delayMs: 750,
      },
      {
        agentId: 'agent_security',
        agentName: 'Security Auditor',
        agentRole: 'reviewer',
        type: 'action',
        content: 'Running security_scanner against proposed token verification pipeline and idempotency key collision handlers.',
        toolCallName: 'security_scanner',
        toolCallArgs: { target: 'payment_ingestion_boundary', strict_mode: true },
        tokens: 290,
        delayMs: 700,
      },
      {
        agentId: 'agent_security',
        agentName: 'Security Auditor',
        agentRole: 'reviewer',
        type: 'observation',
        content: 'Security Check Passed (OWASP A+). Recommends constant-time HMAC validation on merchant webhook payloads and strict 24-hour TTL with jitter on Redis idempotency locks.',
        tokens: 245,
        delayMs: 600,
      },
      {
        agentId: 'agent_coder',
        agentName: 'Principal Coder',
        agentRole: 'coder',
        type: 'action',
        content: 'Writing production TypeScript microservice: Implementing atomic Redis Lua idempotent guard, PostgreSQL transaction with Outbox record, and graceful error recovery.',
        toolCallName: 'code_sandbox',
        toolCallArgs: { language: 'typescript', code: '// IngestPaymentWithOutbox implementation verification' },
        tokens: 490,
        delayMs: 900,
      },
      {
        agentId: 'agent_coder',
        agentName: 'Principal Coder',
        agentRole: 'coder',
        type: 'observation',
        content: 'Code sandbox executed successfully. Zero compilation errors, strict types enforced, 100% of synthetic concurrent transactions handled with zero double-spends.',
        tokens: 220,
        delayMs: 600,
      },
      {
        agentId: 'agent_critic',
        agentName: 'Benchmark Critic',
        agentRole: 'reviewer',
        type: 'action',
        content: 'Running data_analyzer on simulated 50,000 TPS ingestion load to verify latency distribution and memory stability.',
        toolCallName: 'data_analyzer',
        toolCallArgs: { metric_keys: ['p95LatencyMs', 'p99LatencyMs', 'throughputRPS'], sample_size: 10000 },
        tokens: 310,
        delayMs: 800,
      },
      {
        agentId: 'agent_critic',
        agentName: 'Benchmark Critic',
        agentRole: 'reviewer',
        type: 'critique',
        content: 'Benchmark validation: P95 latency: 8.4ms | P99 latency: 12.6ms | Throughput: 54,200 TPS. Certified for mission-critical production deployment.',
        tokens: 260,
        delayMs: 650,
      },
      {
        agentId: 'agent_supervisor',
        agentName: 'Supervisor Core',
        agentRole: 'supervisor',
        type: 'synthesis',
        content: 'All quality gates cleared. Finalizing generated artifacts: PaymentPipeline_OutboxService.ts ready with full TypeScript types, unit tests, and production architecture specification.',
        tokens: 350,
        delayMs: 600,
      },
    ],
    finalArtifact: {
      id: 'art_sys_arch_01',
      title: 'PaymentPipeline_OutboxService.ts',
      type: 'code',
      language: 'typescript',
      generatedBy: 'CogniFlow Autonomous Multi-Agent Swarm',
      timestamp: new Date().toISOString(),
      metrics: {
        linesOfCode: 172,
        testCasesPassing: '18/18 Unit Tests Passing (100%)',
        complexityScore: 'Cyclomatic Complexity: 4 (Clean Code)',
      },
      content: `/**
 * CogniFlow Autonomous Multi-Agent Generated Service
 * Architecture: Transactional Outbox with Redis Atomic Idempotency
 * SLA Target: 50,000 TPS | P99 < 15ms | Zero Double-Processing
 */

import { createHash } from 'crypto';

export interface PaymentRequest {
  idempotencyKey: string;
  merchantId: string;
  amountCents: number;
  currency: string;
  sourceToken: string;
  metadata?: Record<string, string>;
}

export interface PaymentResult {
  status: 'ACCEPTED' | 'DUPLICATE' | 'FAILED';
  transactionId?: string;
  message: string;
  cachedResponse?: boolean;
}

export interface OutboxRecord {
  id: string;
  aggregateType: 'PAYMENT';
  aggregateId: string;
  eventType: 'PAYMENT_INGESTED';
  payloadJson: string;
  createdAt: Date;
  published: boolean;
}

export class ResilientPaymentIngestionEngine {
  private readonly redisTtlSeconds = 86400; // 24hr TTL

  constructor(
    private readonly redisClient: any,
    private readonly dbPool: any,
    private readonly eventBus: any
  ) {}

  /**
   * Atomic Lua script guarantees idempotency key locking without race conditions
   */
  private readonly IDEMPOTENCY_LUA_SCRIPT = \`
    local key = KEYS[1]
    local payload = ARGV[1]
    local ttl = tonumber(ARGV[2])
    
    local existing = redis.call('GET', key)
    if existing then
      return {0, existing} -- Already processed, return cached payload
    end
    
    -- Reserve lock atomically
    redis.call('SET', key, payload, 'EX', ttl)
    return {1, 'LOCKED'}
  \`;

  public async processPayment(request: PaymentRequest): Promise<PaymentResult> {
    const lockKey = \`idemp:pay:\${request.merchantId}:\${request.idempotencyKey}\`;
    const fingerprint = this.computePayloadHash(request);

    // Step 1: Atomic Idempotency Check via Redis
    const [status, cachedData] = await this.redisClient.eval(
      this.IDEMPOTENCY_LUA_SCRIPT,
      1,
      lockKey,
      JSON.stringify({ fingerprint, status: 'PROCESSING' }),
      this.redisTtlSeconds
    );

    if (status === 0) {
      const parsed = JSON.parse(cachedData);
      return {
        status: 'DUPLICATE',
        transactionId: parsed.transactionId,
        message: 'Idempotency key replayed: returning deterministic cached response.',
        cachedResponse: true,
      };
    }

    // Step 2: Atomic Database Transaction with Outbox Table
    const client = await this.dbPool.connect();
    try {
      await client.query('BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED');

      const txId = \`tx_\${Date.now()}_\${Math.random().toString(36).substring(2, 9)}\`;

      // Insert ledger entry
      await client.query(
        \`INSERT INTO payment_ledger (id, merchant_id, amount_cents, currency, status, created_at)
         VALUES ($1, $2, $3, $4, 'PENDING_SETTLEMENT', NOW())\`,
        [txId, request.merchantId, request.amountCents, request.currency]
      );

      // Insert Transactional Outbox record for reliable Debezium/Kafka emission
      const outboxPayload = JSON.stringify({
        transactionId: txId,
        merchantId: request.merchantId,
        amountCents: request.amountCents,
        currency: request.currency,
        timestamp: new Date().toISOString(),
      });

      await client.query(
        \`INSERT INTO transactional_outbox (id, aggregate_type, aggregate_id, event_type, payload_json, published)
         VALUES (gen_random_uuid(), 'PAYMENT', $1, 'PAYMENT_INGESTED', $2, false)\`,
        [txId, outboxPayload]
      );

      await client.query('COMMIT');

      // Update Redis cache with final success state
      await this.redisClient.set(
        lockKey,
        JSON.stringify({ fingerprint, status: 'ACCEPTED', transactionId: txId }),
        'EX',
        this.redisTtlSeconds
      );

      return {
        status: 'ACCEPTED',
        transactionId: txId,
        message: 'Payment successfully ingested with ACID guarantees and Outbox record.',
      };
    } catch (err: any) {
      await client.query('ROLLBACK');
      // Release lock on fatal DB error to allow client retry
      await this.redisClient.del(lockKey);
      throw new Error(\`Payment pipeline ingestion failed: \${err.message}\`);
    } finally {
      client.release();
    }
  }

  private computePayloadHash(req: PaymentRequest): string {
    return createHash('sha256')
      .update(\`\${req.merchantId}:\${req.amountCents}:\${req.currency}:\${req.sourceToken}\`)
      .digest('hex');
  }
}
`,
    },
  };
}
