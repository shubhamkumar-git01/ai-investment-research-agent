import { AgentState } from "./state";
import YahooFinance from "yahoo-finance2";
const yahooFinance = new YahooFinance();
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const getModel = () => {
  return new ChatGoogleGenerativeAI({
    model: "gemini-3.5-flash",
    apiKey: process.env.GOOGLE_API_KEY,
    temperature: 0.2,
  });
};

export async function resolveCompanyNode(state: typeof AgentState.State) {
  try {
    // Attempt to search for the ticker symbol
    const searchResults: any = await yahooFinance.search(state.companyName);
    const firstMatch = searchResults.quotes.find(
      (q: any) => q.isYahooFinance === true && q.quoteType === "EQUITY"
    ) || searchResults.quotes[0];

    if (!firstMatch) {
      return {
        error: `Could not find any public market data for "${state.companyName}". Note: This agent works best for public companies.`,
      };
    }

    return {
      companyName: firstMatch.longname || firstMatch.shortname || state.companyName,
      sources: [`Yahoo Finance Search (${firstMatch.symbol})`],
    };
  } catch (err: any) {
    console.error("Resolve Company Error:", err);
    return { error: "Failed to resolve company ticker." };
  }
}

export async function gatherFinancialsNode(state: typeof AgentState.State) {
  if (state.error) return {};

  try {
    const searchResults: any = await yahooFinance.search(state.companyName);
    const ticker = searchResults.quotes[0]?.symbol;

    if (!ticker) {
      return { financials: null };
    }

    const quote: any = await yahooFinance.quote(ticker);
    const summary: any = await yahooFinance.quoteSummary(ticker, {
      modules: ["assetProfile", "financialData", "defaultKeyStatistics"],
    });

    const financials = {
      symbol: ticker,
      price: quote.regularMarketPrice,
      currency: quote.currency,
      marketCap: quote.marketCap,
      fiftyTwoWeekHigh: quote.fiftyTwoWeekHigh,
      fiftyTwoWeekLow: quote.fiftyTwoWeekLow,
      sector: summary.assetProfile?.sector,
      industry: summary.assetProfile?.industry,
      website: summary.assetProfile?.website,
      description: summary.assetProfile?.longBusinessSummary,
      totalRevenue: summary.financialData?.totalRevenue,
      revenueGrowth: summary.financialData?.revenueGrowth,
      profitMargins: summary.financialData?.profitMargins,
      operatingMargins: summary.financialData?.operatingMargins,
      returnOnEquity: summary.financialData?.returnOnEquity,
      debtToEquity: summary.financialData?.debtToEquity,
      trailingPE: summary.defaultKeyStatistics?.trailingPE,
      forwardPE: summary.defaultKeyStatistics?.forwardPE,
    };

    return { financials, sources: [...state.sources, `Yahoo Finance Data (${ticker})`] };
  } catch (err: any) {
    console.error("Gather Financials Error:", err);
    return { error: "Failed to gather financial data." };
  }
}

export async function gatherNewsNode(state: typeof AgentState.State) {
  if (state.error) return {};

  try {
    // Yahoo finance search also returns news articles
    const searchResults: any = await yahooFinance.search(state.companyName, { newsCount: 5 });
    
    const news = searchResults.news.map((item: any) => ({
      title: item.title,
      publisher: item.publisher,
      link: item.link,
      publishedAt: item.providerPublishTime ? new Date(item.providerPublishTime * 1000).toISOString() : null,
    }));

    return { news, sources: [...state.sources, "Yahoo Finance News"] };
  } catch (err: any) {
    console.error("Gather News Error:", err);
    return { error: "Failed to gather news data." };
  }
}

export async function analyzeCompanyNode(state: typeof AgentState.State) {
  if (state.error) return {};

  const model = getModel();
  
  const prompt = `You are a professional financial analyst.
Based on the following data, write a comprehensive 2-3 paragraph overview of the company, its business model, and its core industry context.
If financial data description is available, use it, but expand it to sound like an executive summary.

Company Name: ${state.companyName}
Industry: ${state.financials?.industry || "Unknown"}
Sector: ${state.financials?.sector || "Unknown"}
Company Description: ${state.financials?.description || "Not provided"}

Return ONLY the overview text, formatted professionally.`;

  try {
    const res = await model.invoke(prompt);
    return { overview: res.content.toString() };
  } catch (err: any) {
    console.error("Analyze Company Error:", err);
    return { error: "Failed to generate company overview." };
  }
}

export async function analyzeSwotNode(state: typeof AgentState.State) {
  if (state.error) return {};

  const model = getModel();
  
  const prompt = `You are a professional financial analyst.
Perform a SWOT analysis (Strengths, Weaknesses, Opportunities, Threats) and a Risk analysis based on the following data for ${state.companyName}.

Financial Metrics:
- Market Cap: ${state.financials?.marketCap}
- Total Revenue: ${state.financials?.totalRevenue}
- Revenue Growth: ${state.financials?.revenueGrowth}
- Profit Margins: ${state.financials?.profitMargins}
- Trailing P/E: ${state.financials?.trailingPE}
- Debt to Equity: ${state.financials?.debtToEquity}

Recent News:
${state.news.map((n, i) => `${i + 1}. ${n.title} (${n.publisher})`).join("\n")}

Respond ONLY in valid JSON format matching this structure:
{
  "strengths": ["point 1", "point 2"],
  "weaknesses": ["point 1", "point 2"],
  "opportunities": ["point 1", "point 2"],
  "threats": ["point 1", "point 2"],
  "risks": ["point 1", "point 2"]
}
`;

  try {
    const res = await model.invoke(prompt);
    let content = res.content.toString().trim();
    if (content.startsWith("```json")) {
      content = content.replace(/```json/g, "").replace(/```/g, "").trim();
    }
    
    const parsed = JSON.parse(content);
    return {
      strengths: parsed.strengths || [],
      weaknesses: parsed.weaknesses || [],
      opportunities: parsed.opportunities || [],
      threats: parsed.threats || [],
      risks: parsed.risks || [],
    };
  } catch (err: any) {
    console.error("Analyze SWOT Error:", err);
    return { error: "Failed to generate SWOT analysis." };
  }
}

export async function generateRecommendationNode(state: typeof AgentState.State) {
  if (state.error) return {};

  const model = getModel();
  
  const prompt = `You are an elite Investment Manager. 
Synthesize all the research for ${state.companyName} and provide a final investment recommendation.

Overview: ${state.overview}
Strengths: ${state.strengths.join(", ")}
Weaknesses: ${state.weaknesses.join(", ")}
Risks: ${state.risks.join(", ")}
Financials: Market Cap ${state.financials?.marketCap}, P/E ${state.financials?.trailingPE}, Margins ${state.financials?.profitMargins}
Recent News: ${state.news.map(n => n.title).join(" | ")}

You must decide whether this stock is a BUY, HOLD, or AVOID.
Also provide a confidence score from 0 to 100 based on the strength of the data.
Finally, provide a detailed reasoning (2-3 paragraphs) explaining your decision.

Respond ONLY in valid JSON format matching this structure:
{
  "recommendation": "BUY" | "HOLD" | "AVOID",
  "confidence": 85,
  "reasoning": "Detailed reasoning here..."
}
`;

  try {
    const res = await model.invoke(prompt);
    let content = res.content.toString().trim();
    if (content.startsWith("```json")) {
      content = content.replace(/```json/g, "").replace(/```/g, "").trim();
    }
    
    const parsed = JSON.parse(content);
    return {
      recommendation: parsed.recommendation,
      confidence: parsed.confidence,
      reasoning: parsed.reasoning,
    };
  } catch (err: any) {
    console.error("Generate Recommendation Error:", err);
    return { error: "Failed to generate recommendation." };
  }
}
