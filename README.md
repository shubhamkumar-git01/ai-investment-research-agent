# InsideIIM AI Investment Research Agent

![Dashboard Preview](#) <!-- Placeholder for screenshot -->

An elite AI-powered investment research agent built for the InsideIIM AI Product Development Engineer (Intern) assignment. 

This application takes a company name, autonomously researches it using financial data and latest news, and generates a professional investment report with a final recommendation (BUY/HOLD/AVOID) using a sophisticated **LangGraph** workflow and **Gemini 2.5 Flash**.

## 🚀 Features

- **Autonomous Research:** Uses LangGraph to orchestrate a multi-step research workflow.
- **Real-Time Data:** Integrates with Yahoo Finance API for live market caps, P/E ratios, revenue growth, and recent news.
- **AI Synthesis:** Gemini 2.5 Flash analyzes business models, performs SWOT analysis, and synthesizes a final recommendation with a confidence score.
- **Premium SaaS UI:** Built with Next.js 15, Tailwind CSS, shadcn/ui, and Framer Motion for a stunning glassmorphic design and smooth loading animations (AI Reasoning Timeline).
- **Export & Share:** Easily copy the report summary or export it to a beautiful PDF.

## 🏗️ Architecture & Workflow

The core of the application is a **LangGraph** State Graph that processes data sequentially:

1. **Resolve Company Node:** Converts user input (e.g., "Apple") into a valid ticker symbol using market search.
2. **Gather Financials Node:** Fetches live quotes and financial summaries (Revenue, Margins, P/E).
3. **Gather News Node:** Fetches the top 5 most recent news articles related to the company.
4. **Analyze Company Node:** Gemini generates a comprehensive business overview.
5. **Analyze SWOT Node:** Gemini evaluates Strengths, Weaknesses, Opportunities, Threats, and Risks based on financials and news.
6. **Generate Recommendation Node:** Gemini synthesizes all previous state data to make a final BUY/HOLD/AVOID decision with reasoning and a confidence score.

### Folder Structure
\`\`\`text
app/                 # Next.js 15 App Router pages and API routes
components/          # React components
  ├── dashboard/     # Specific dashboard components (Hero, Report, Timeline)
  └── ui/            # shadcn/ui reusable components
lib/
  └── agent/         # LangGraph logic
      ├── graph.ts   # Graph definition and edges
      ├── nodes.ts   # Individual AI and data fetching nodes
      └── state.ts   # GraphState schema
\`\`\`

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS v4, shadcn/ui, Framer Motion, Lucide Icons.
- **Backend:** Next.js API Routes (Serverless).
- **AI & Orchestration:** LangChain.js, LangGraph.js, Gemini 2.5 Flash.
- **Data Providers:** \`yahoo-finance2\` (No API keys required, better UX for reviewers!).

## ⚙️ Key Decisions & Trade-offs

1. **Data Source Strategy:** Instead of using Alpha Vantage or Finnhub which require users to generate and supply multiple API keys, I opted for \`yahoo-finance2\` which scrapes/uses public endpoints without requiring an API key. This makes the project significantly easier to set up and evaluate while still demonstrating real-time API integration.
2. **AI Provider:** Used **Gemini 2.5 Flash** for its extreme speed and massive context window, making it perfect for rapid multi-shot LangGraph processing.
3. **Timeline Simulation:** Instead of complex Server-Sent Events (SSE) for streaming LangGraph node status to the client, I implemented a timed UI simulation that mirrors the graph's execution speed. This provides a premium user experience without overcomplicating the serverless API architecture.

## 💻 How to Run Locally

1. **Clone the repository.**
2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`
3. **Set up Environment Variables:**
   Copy \`.env.example\` to \`.env.local\` and add your Gemini API Key.
   \`\`\`env
   GOOGLE_API_KEY="your_gemini_api_key_here"
   \`\`\`
4. **Start the Development Server:**
   \`\`\`bash
   npm run dev
   \`\`\`
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

This project is fully ready for deployment on **Vercel**.
1. Push to GitHub.
2. Import project in Vercel.
3. Add the \`GOOGLE_API_KEY\` environment variable.
4. Deploy!

## 🔮 Future Improvements

- **RAG for SEC Filings:** Incorporate a vector database to perform RAG over recent 10-K and 10-Q filings for deeper financial analysis.
- **Streaming Output:** Implement LangGraph streaming to show the reasoning and report generation character-by-character.
- **Portfolio Tracking:** Allow users to save researched companies to a simulated portfolio.

---
*Developed for InsideIIM Assignment.*
