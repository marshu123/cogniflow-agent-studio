# CogniFlow Architecture & System Design Deep-Dive

This document details the architectural decisions, design patterns, and engineering trade-offs behind **CogniFlow AI Studio**.

---

## 1. Multi-Agent Orchestration Patterns

### Supervisor Pattern vs Peer-to-Peer Mesh
In complex enterprise workflows, peer-to-peer agent communication often degrades into combinatorial message bloat and nondeterministic loops. CogniFlow adopts a **Hierarchical Supervisor Pattern**:

1. **Supervisor Core**: Ingests user directives, performs topological task decomposition, and generates a Directed Acyclic Graph (DAG) of subtasks.
2. **Specialist Worker Pool**:
   - **Architect**: Translates domain requirements into schemas and interface contracts.
   - **Coder**: Generates syntactically correct, strictly typed code adhering to contracts.
   - **Auditor**: Enforces static analysis, security parameters, and OWASP compliance.
   - **Critic**: Executes runtime verification against unit test suites and latency models.
3. **Synthesis Engine**: Merges multi-agent outputs into a coherent, production-ready artifact.

---

## 2. Reflection & Self-Healing Loop

Autonomous agents must possess verification mechanisms to catch subtle logic bugs and hallucinations:

```
[Agent Generates Code] 
          ↓
[Tool: code_sandbox executes AST check] 
          ↓
[Tool: security_scanner evaluates OWASP rules]
          ↓
[Passed?] ─── No ───> [Critic provides structured diff feedback]
    │                                    │
   Yes                        [Agent regenerates code]
    ↓                                    │
[Produce Final Artifact] <─────────────────┘
```

1. **Dynamic Tool Calling**: Agents invoke specialized tools via structured JSON payloads.
2. **Error Boundary Isolation**: If a tool fails or throws an exception, the supervisor catches the error, wraps it into an `Observation` step, and prompts the agent to formulate an alternative plan.
3. **Deterministic Completion Gate**: The workflow terminates only when the Critic explicitly returns a verification score above the confidence threshold (95%+).

---

## 3. Real-Time Telemetry & Token Optimization

### Blended Token Cost Calculation
```math
\text{Cost} = \left(\frac{\text{Total Tokens}}{1,000,000}\right) \times \$0.35 \text{ (blended input/output rate)}
```

### Streaming Event Loop
To decouple computation from UI rendering:
- The orchestrator singleton runs an asynchronous generator yielding step events.
- Telemetry metrics are calculated using high-resolution performance timers (`performance.now()`).
- React renders live updates at 60 FPS without layout thrashing.

---

## 4. Security & Zero-Trust Sandbox Isolation

1. **Tool Invocation Whitelist**: Only tools explicitly registered in `TOOLS_REGISTRY` can be executed by agents.
2. **No Arbitrary Code Execution on Host**: In production, the code sandbox runs in an isolated gVisor/Wasm container with strict memory limits (128MB) and network sandboxing.
3. **Client-Side API Key Safety**: When users supply a Google Gemini API key, it is stored strictly in `localStorage` on the client and dispatched directly over TLS to Google's official endpoints. It is never logged or sent to any intermediate proxy.
