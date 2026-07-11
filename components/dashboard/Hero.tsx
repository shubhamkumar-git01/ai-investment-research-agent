import { motion } from "framer-motion";
import { Search, Sparkles, TrendingUp, BarChart3, Globe } from "lucide-react";
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
    <div className="relative isolate px-6 pt-14 lg:px-8 w-full">
      {/* Animated subtle grid background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-4xl py-24 sm:py-32 lg:py-40 text-center relative z-10">
        
        {/* Floating Badges */}
        <div className="hidden sm:block absolute top-10 left-10 animate-bounce" style={{ animationDuration: '4s' }}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg text-xs font-medium text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-green-500" /> Real-time Data
          </div>
        </div>
        <div className="hidden sm:block absolute bottom-20 right-10 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg text-xs font-medium text-muted-foreground">
            <BarChart3 className="h-4 w-4 text-blue-500" /> Deep SWOT
          </div>
        </div>
        <div className="hidden md:block absolute top-32 right-20 animate-bounce" style={{ animationDuration: '6s', animationDelay: '0.5s' }}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg text-xs font-medium text-muted-foreground">
            <Globe className="h-4 w-4 text-primary" /> Web Search
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
        >
          <div className="mb-8 flex justify-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-muted-foreground ring-1 ring-white/10 hover:ring-white/20 bg-white/5 backdrop-blur-sm cursor-default"
            >
              InsideIIM AI Labs Assignment <span className="text-primary font-bold">v1.0</span>
            </motion.div>
          </div>
          
          <h1 className="text-5xl font-black tracking-tighter text-foreground sm:text-7xl mb-6 relative">
            AI Investment <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-purple-600 animate-gradient-x">
              Research Agent
            </span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto font-medium">
            Enter any public company to generate a comprehensive, Wall Street-grade investment research report instantly. Powered by LangGraph and Gemini 2.5 Flash.
          </p>
          
          <div className="mt-12 flex flex-col items-center justify-center gap-y-4 sm:flex-row sm:gap-x-6">
            <form onSubmit={handleSubmit} className="w-full max-w-lg relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center">
                <Search className="absolute left-6 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g. Apple, Tesla, Reliance..."
                  className="w-full rounded-full bg-background border border-white/10 py-5 pl-14 pr-36 text-foreground shadow-2xl ring-1 ring-inset ring-white/5 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-base transition-all duration-300 outline-none"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg hover:shadow-primary/25 hover:bg-primary/90 flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                >
                  <Sparkles className="h-4 w-4" /> Analyze
                </button>
              </div>
            </form>
          </div>
          
          <div className="mt-8 flex justify-center gap-4 text-xs text-muted-foreground font-medium">
            <span>Try:</span>
            <button onClick={() => setQuery("AAPL")} className="hover:text-primary transition-colors underline underline-offset-4">AAPL</button>
            <button onClick={() => setQuery("TSLA")} className="hover:text-primary transition-colors underline underline-offset-4">TSLA</button>
            <button onClick={() => setQuery("RELIANCE.NS")} className="hover:text-primary transition-colors underline underline-offset-4">RELIANCE</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
