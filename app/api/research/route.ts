import { NextResponse } from "next/server";
import { researchGraph } from "@/lib/agent/graph";

export const maxDuration = 60; // Set Vercel max duration to 60 seconds

export async function POST(req: Request) {
  try {
    const { companyName } = await req.json();

    if (!companyName) {
      return NextResponse.json({ error: "Company name is required." }, { status: 400 });
    }

    if (!process.env.GOOGLE_API_KEY) {
       return NextResponse.json({ error: "Google API Key is not configured in environment variables." }, { status: 500 });
    }

    const initialState = {
      companyName,
      overview: "",
      financials: null,
      news: [],
      risks: [],
      strengths: [],
      weaknesses: [],
      opportunities: [],
      threats: [],
      recommendation: "" as "" | "BUY" | "HOLD" | "AVOID",
      confidence: 0,
      reasoning: "",
      sources: [],
      error: null,
    };

    const finalState = await researchGraph.invoke(initialState);

    if (finalState.error) {
      return NextResponse.json({ error: finalState.error }, { status: 500 });
    }

    return NextResponse.json(finalState);
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during research." },
      { status: 500 }
    );
  }
}
