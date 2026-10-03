# ⚡ CogniFlow AI — Autonomous Multi-Agent Orchestration & Workflow Intelligence Studio

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square&logo=githubactions)](https://github.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React-19.x-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Tests-8%2F8%20Passing-success?style=flat-square&logo=vitest)](https://vitest.dev/)
[![Gemini API](https://img.shields.io/badge/Google%20Gemini-2.5%20Pro%20%7C%20Flash-orange?style=flat-square&logo=google)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/license-MIT-purple?style=flat-square)](LICENSE)

<p align="center">
  <img src="public/cogniflow-banner.jpg" alt="CogniFlow Studio Banner" width="100%" style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);" />
</p>

> **CogniFlow** is an enterprise-grade autonomous multi-agent orchestration platform designed for complex distributed problem-solving. Featuring real-time streaming traces, directed acyclic graph (DAG) workflow visualization, self-correcting reflection loops, and zero-trust sandboxed tool execution, CogniFlow demonstrates production-ready AI systems engineering.

---

## 🌟 Why Recruiters & Hiring Managers Love This Project

Most AI portfolio projects are simple API wrappers around an LLM chat endpoint. **CogniFlow was built to demonstrate principal-level full-stack AI engineering rigor**:

1. **Autonomous Multi-Agent Topology (Supervisor Pattern)**: Orchestrates specialized agent personas (Architect, Coder, Infosec Reviewer, Benchmark Critic) coordinated by a deterministic supervisor.
2. **Self-Healing Reflection Loop**: Agents do not merely generate output; they critique, run formal verification in sandboxes, and iterate until strict SLA thresholds (OWASP A+, p99 latency < 15ms) are met.
3. **Real-Time Streaming Telemetry**: Live token streaming, wall-clock latency measurement, token velocity metrics (tokens/sec), and blended cost estimation.
4. **Interactive Glassmorphic DAG Canvas**: Built with pure Vanilla CSS and SVG cubic Bézier connectors—zero bloated UI libraries, ultra-responsive, and modern dark-mode aesthetic.
5. **Zero-Friction Recruiter Evaluation**: Includes a deterministic simulated swarm mode so anyone evaluating this repository can clone and run it instantly without creating API accounts or entering keys.

---

## 🏗️ System Architecture & Execution Flow

```mermaid
graph TD
    User([User Directive / Prompt]) --> Supervisor[⚡ Supervisor Core Agent]
    
    subgraph DAG Orchestration Engine
        Supervisor -->|Decomposes Spec| Architect[📐 Distributed System Architect]
        Supervisor -->|Assigns Implementation| Coder[💻 Principal Coder]
        Supervisor -->|Enforces Security Gate| Auditor[🛡️ Security Auditor]
        
        Architect -->|Schema & State Machine| Coder
        Coder -->|Code Submission| Critic[⚖️ Benchmark Critic]
        Auditor -->|OWASP AST Report| Critic
    end

    subgraph Sandboxed Tool Registry
        Architect -.-> ToolMem[🧠 Memory Retriever]
        Architect -.-> ToolSearch[🔍 Web Search]
        Auditor -.-> ToolSec[🛡️ Security Scanner]
        Coder -.-> ToolBox[📦 Code Sandbox]
        Critic -.-> ToolData[📊 Data Analyzer]
    end

    Critic -->|Verified Production Artifact| Output([🚀 Production-Ready Deliverable])

    style Supervisor fill:#1e1b4b,stroke:#6366f1,stroke-width:2px
    style Architect fill:#082f49,stroke:#38bdf8,stroke-width:2px
    style Coder fill:#064e3b,stroke:#10b981,stroke-width:2px
    style Auditor fill:#451a03,stroke:#f59e0b,stroke-width:2px
    style Critic fill:#500724,stroke:#ec4899,stroke-width:2px
```

---

## 🚀 Key Technical Features

### 1. Directed Acyclic Graph (DAG) Workflow Engine
- Dynamic node-based graph mapping execution flow with glowing pulse animations on active data edges.
- Interactive agent inspector allowing live inspection of model temperatures, system prompts, memory contexts, and bound tools.

### 2. Real-Time Telemetry & Token Accounting
- Live token throughput velocity (e.g. `240 tok/s`).
- Cumulative token counter and automated OPEX calculation based on blended Gemini 2.5 token pricing.
- p95 and p99 latency tracking for all subagent phases.

### 3. Sandboxed Tool Execution
- **`code_sandbox`**: Isolates code snippets, verifying syntax and assertions before passing to downstream agents.
- **`security_scanner`**: Static AST analysis ensuring OWASP compliance, memory safety, and secret sanitization.
- **`data_analyzer`**: Runs throughput modeling and latency distribution calculations on synthetic loads.
- **`memory_retriever`**: Queries cached vector embeddings and past orchestration session state.
- **`web_search`**: Live benchmark index search across technical databases and academic preprints.

### 4. Enterprise Scenario Presets
- 🏢 **Distributed System Architecture & Idempotent Engine**: Synthesizes a 50k TPS payment pipeline with Redis atomic Lua idempotency and transactional outbox.
- 📈 **Autonomous Competitor & Market Intelligence**: Dispatches deep-web search agents and quantitative statistical models to synthesize competitor positioning and compute unit economics.
- ⚡ **Interactive Sandbox Testing**: Live "Verify in Sandbox" trigger verifying passing unit tests and zero runtime exceptions.

---

## 🛠️ Tech Stack & Design Decisions

| Layer | Technology | Decision Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19 & TypeScript 5** | Strict type safety, functional components, zero-runtime bugs. |
| **Build & Tooling** | **Vite 6** | Sub-second HMR, optimized production tree-shaking, lightweight bundle. |
| **Styling** | **Vanilla CSS (Custom Design System)** | Maximum performance, zero framework bloat, pixel-perfect glassmorphism. |
| **State Management** | **React Hooks & Custom Event Bus** | Decoupled orchestrator singleton with reactive step listener subscriptions. |
| **Testing** | **Vitest** | Native ESM test runner; blazing fast unit test execution. |
| **AI Integration** | **Google Gemini 2.5 API** | Multi-turn reasoning, high throughput, with seamless offline fallback mode. |
| **Icons & Visuals** | **Lucide React & Canvas Confetti** | Minimalist modern icon set with celebratory completion interactions. |

---

## ⚡ Quick Start Guide

### Prerequisites
- Node.js `v20.x` or higher
- npm `v10.x` or higher

### Installation

```bash
# 1. Clone repository
git clone https://github.com/your-username/cogniflow-agent-studio.git
cd cogniflow-agent-studio

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Running Unit Tests

```bash
npm test
```

### Production Build

```bash
npm run build
npm run preview
```

---

## 🐳 Docker Support

To run CogniFlow in a containerized environment:

```bash
# Build and run with Docker Compose
docker compose up --build
```

Access the studio at `http://localhost:3000`.

---

## 🧪 Recruiter & System Design Q&A

**Q: How does CogniFlow handle agent hallucination?**  
*A:* CogniFlow employs a **Supervisor-Critic Architecture** with multi-turn reflection. Rather than blindly accepting code or analysis generated by worker agents, the Critic Agent executes the code in `code_sandbox` and audits it with `security_scanner`. If assertions or security gates fail, the Critic sends targeted feedback back to the worker for corrective regeneration.

**Q: Why choose Vanilla CSS instead of Tailwind or an off-the-shelf component library?**  
*A:* Off-the-shelf libraries often look generic and make portfolio apps feel like copy-paste templates. Crafting a custom CSS design system demonstrates deep command of modern web standards (`backdrop-filter`, CSS custom properties, HSL color modeling, smooth keyframe transitions, and SVG path calculations).

**Q: Can this connect to real models?**  
*A:* Yes! Click the "Settings" button in the header to enter your Google Gemini API key. CogniFlow dynamically switches from the deterministic mock swarm to live Gemini 2.5 streaming inference.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
