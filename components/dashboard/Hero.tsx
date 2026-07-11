import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";

export function Hero({ onSearch }: { onSearch: (company: string) => void }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 flex justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-white/10 hover:ring-white/20">
              InsideIIM AI Labs Assignment <span className="text-primary font-semibold">v1.0</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            AI Investment Research Agent
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Enter a company name to generate a comprehensive, AI-powered investment research report instantly. Built with LangGraph and Gemini 2.5 Flash.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <form onSubmit={handleSubmit} className="w-full max-w-md relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Apple, Tesla, Reliance..."
                className="w-full rounded-full bg-white/5 border border-white/10 py-4 pl-12 pr-32 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 glassmorphism transition-all duration-300"
                required
              />
              <button
                type="submit"
                className="absolute right-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary flex items-center gap-2 transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="h-4 w-4" /> Analyze
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
