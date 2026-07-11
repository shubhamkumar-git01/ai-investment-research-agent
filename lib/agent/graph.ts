import { StateGraph, START, END } from "@langchain/langgraph";
import { AgentState } from "./state";
import {
  resolveCompanyNode,
  gatherFinancialsNode,
  gatherNewsNode,
  analyzeCompanyNode,
  analyzeSwotNode,
  generateRecommendationNode,
} from "./nodes";

const builder = new StateGraph(AgentState)
  .addNode("resolve_company", resolveCompanyNode)
  .addNode("gather_financials", gatherFinancialsNode)
  .addNode("gather_news", gatherNewsNode)
  .addNode("analyze_company", analyzeCompanyNode)
  .addNode("analyze_swot", analyzeSwotNode)
  .addNode("generate_recommendation", generateRecommendationNode)

  .addEdge(START, "resolve_company")
  .addConditionalEdges("resolve_company", (state) => {
    if (state.error) return END;
    return "gather_financials";
  })
  .addConditionalEdges("gather_financials", (state) => {
    if (state.error) return END;
    return "gather_news";
  })
  .addConditionalEdges("gather_news", (state) => {
    if (state.error) return END;
    return "analyze_company";
  })
  .addConditionalEdges("analyze_company", (state) => {
    if (state.error) return END;
    return "analyze_swot";
  })
  .addConditionalEdges("analyze_swot", (state) => {
    if (state.error) return END;
    return "generate_recommendation";
  })
  .addConditionalEdges("generate_recommendation", (state) => {
    return END;
  });

export const researchGraph = builder.compile();
