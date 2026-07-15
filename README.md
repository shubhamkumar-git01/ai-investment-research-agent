<div align="center">
  <a href="https://ai-investment-research-agent-amber.vercel.app/">
    <img src="https://readme-typing-svg.herokuapp.com?font=Space+Grotesk&weight=700&size=32&pause=1000&color=3B82F6&center=true&vCenter=true&width=800&height=60&lines=AI+Investment+Research+Agent;From+Messy+Market+Questions...;...To+Clean+Investment+Signals;Powered+by+LangGraph+%26+Gemini" alt="Typing SVG" />
  </a>
  <br/>
  
  <p><b>A state-of-the-art AI-powered Investment Research Agent built to deliver modular, high-performance features for the Fintech ecosystem.</b></p>

  <p>
    <a href="https://ai-investment-research-agent-amber.vercel.app/">
      <img src="https://img.shields.io/badge/Live_Demo-View_Project-3B82F6?style=for-the-badge&logo=vercel" alt="Live Demo" />
    </a>
  </p>

  <div>
    <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/LangGraph-Agent-blue?style=for-the-badge" alt="LangGraph" />
    <img src="https://img.shields.io/badge/Gemini-2.5_Flash-orange?style=for-the-badge&logo=google" alt="Gemini" />
    <img src="https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind" />
  </div>
</div>

---

## 🌟 Overview

**AI Investment Research Agent** is a cutting-edge Fintech web application that transforms unstructured finance prompts into structured, Wall Street-grade insight cards in seconds. 

It leverages **LangGraph** and **Google Gemini** to autonomously fetch, analyze, and synthesize public financial data via RESTful APIs. Designed with a highly responsive, dark-mode first UI, it seamlessly integrates user-facing elements with robust Node.js server-side logic.

<div align="center">
  <i>"Run a lightweight research workflow that converts unstructured finance prompts into structured insight cards you can scan in seconds."</i>
</div>

---

## ✨ Core Features & Fintech Capabilities

- **🧠 Autonomous Agentic Workflow**: Uses LangGraph to manage stateful, multi-step AI reasoning (Resolve -> Financials -> News -> Overview -> SWOT -> Verdict).
- **📊 Real-time Fintech API Integration**: Integrates with Yahoo Finance RESTful APIs for live market caps, P/E ratios, margins, and recent news.
- **⚡ Server-Side Logic & Microservices**: Built on Node.js/Next.js architecture to handle heavy data processing and AI synthesis securely on the backend.
- **🎨 Premium Responsive UI**: Built with Next.js 15, React.js, Tailwind CSS, and Framer Motion. 

## 💎 User Experience & Visual Design

- **Cinematic Dark Mode**: Features a sleek, modern dark-themed interface optimized for long reading sessions and professional financial analysis.
- **Micro-animations & Fluidity**: Utilizes Framer Motion for staggered list reveals, smooth layout transitions, and interactive hover states that make the application feel alive.
- **Skeleton Loaders & State Management**: Implements polished skeleton loading states during API fetch and AI synthesis phases, ensuring the user is always aware of the agent's progress.
- **Responsive Layout**: 100% mobile-first design ensuring Wall Street-grade research is readable on any device without compromising on data density.
- **📄 Structured Insight Cards**: Automatically formats complex financial analysis into easy-to-read Summary, Risks, Sentiment, and Actionable Angle cards.

## 🏗️ System Architecture

The agent runs a cyclical LangGraph pipeline to generate insights:

```mermaid
graph TD
    A[Resolve Company & Ticker] --> B[Gather Financials]
    B --> C[Fetch Latest News]
    C --> D[Analyze Business Model & Moat]
    D --> E[Perform Deep SWOT Analysis]
    E --> F[Generate Final Recommendation]
    
    style A fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff
    style B fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff
    style C fill:#0f172a,stroke:#3b82f6,stroke-width:2px,color:#fff
    style D fill:#0f172a,stroke:#8b5cf6,stroke-width:2px,color:#fff
    style E fill:#0f172a,stroke:#8b5cf6,stroke-width:2px,color:#fff
    style F fill:#0f172a,stroke:#10b981,stroke-width:2px,color:#fff
```

## 🚀 Quick Start Guide

1. **Clone the repository**
   ```bash
   git clone https://github.com/shubhamkumar-git01/ai-investment-research-agent.git
   cd ai-investment-research-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Copy `.env.example` to `.env.local` and add your Google Gemini API key:
   ```bash
   cp .env.example .env.local
   ```
   Add: `GOOGLE_API_KEY="your_api_key_here"`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Technology Stack
- **Frontend Engine**: Next.js 15 (App Router), React, Tailwind CSS, Framer Motion, shadcn/ui
- **Backend & AI Logic**: Node.js, LangGraph, LangChain, Google Gemini API
- **Data Integration Services**: Yahoo Finance REST APIs (`yahoo-finance2`)

## ⚖️ Key Decisions & Trade-offs
- **Why LangGraph over standard LangChain chains?** Financial research is inherently cyclical and stateful. The agent needs to first fetch the ticker, then financials, then news, and only then synthesize. LangGraph provides a robust state machine that makes passing data between these discrete reasoning nodes predictable and debuggable.
- **Why Gemini 1.5 Flash?** For a real-time web application, latency is critical. While larger models might offer marginally deeper reasoning, Gemini 1.5 Flash provides an exceptional balance of high-quality financial synthesis and blazing-fast response times, ensuring a premium user experience.

---
<div align="center">
  <i>Engineered for the Fintech Ecosystem • Open Source</i>
</div>
