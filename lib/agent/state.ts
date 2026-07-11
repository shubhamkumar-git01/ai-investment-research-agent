import { Annotation } from "@langchain/langgraph";

export const AgentState = Annotation.Root({
  companyName: Annotation<string>(),
  overview: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  financials: Annotation<any>({
    reducer: (x, y) => y ?? x,
    default: () => null,
  }),
  news: Annotation<any[]>({
    reducer: (x, y) => y ?? x,
    default: () => [],
  }),
  risks: Annotation<string[]>({
    reducer: (x, y) => y ?? x,
    default: () => [],
  }),
  strengths: Annotation<string[]>({
    reducer: (x, y) => y ?? x,
    default: () => [],
  }),
  weaknesses: Annotation<string[]>({
    reducer: (x, y) => y ?? x,
    default: () => [],
  }),
  opportunities: Annotation<string[]>({
    reducer: (x, y) => y ?? x,
    default: () => [],
  }),
  threats: Annotation<string[]>({
    reducer: (x, y) => y ?? x,
    default: () => [],
  }),
  recommendation: Annotation<"BUY" | "HOLD" | "AVOID" | "">({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  confidence: Annotation<number>({
    reducer: (x, y) => y ?? x,
    default: () => 0,
  }),
  reasoning: Annotation<string>({
    reducer: (x, y) => y ?? x,
    default: () => "",
  }),
  sources: Annotation<string[]>({
    reducer: (x, y) => y ?? x,
    default: () => [],
  }),
  error: Annotation<string | null>({
    reducer: (x, y) => y ?? x,
    default: () => null,
  }),
});
