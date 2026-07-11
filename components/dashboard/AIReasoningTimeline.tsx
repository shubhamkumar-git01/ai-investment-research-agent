import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

const steps = [
  { id: 1, name: "Resolving Company & Ticker", duration: 1500 },
  { id: 2, name: "Gathering Financial Data", duration: 2500 },
  { id: 3, name: "Fetching Latest News", duration: 2000 },
  { id: 4, name: "Analyzing Business Model", duration: 3000 },
  { id: 5, name: "Performing SWOT Analysis", duration: 3500 },
  { id: 6, name: "Generating Final Recommendation", duration: 4000 },
];
const TOTAL_DURATION = steps.reduce((acc, step) => acc + step.duration, 0);

export function AIReasoningTimeline({ isComplete }: { isComplete: boolean }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isComplete) {
      setCurrentStep(steps.length + 1);
      setProgress(100);
      return;
    }

    let startTime = Date.now();
    let animationFrame: number;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min((elapsed / TOTAL_DURATION) * 100, 99);
      setProgress(percentage);
      if (percentage < 99) {
        animationFrame = requestAnimationFrame(updateProgress);
      }
    };
    
    animationFrame = requestAnimationFrame(updateProgress);

    let timeout: NodeJS.Timeout;
    const runSteps = async () => {
      for (let i = 0; i < steps.length - 1; i++) {
        await new Promise(resolve => {
          timeout = setTimeout(resolve, steps[i].duration);
        });
        if (isComplete) break;
        setCurrentStep(prev => prev + 1);
      }
    };

    runSteps();

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [isComplete]);

  return (
    <div className="w-full max-w-2xl mx-auto my-12 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group hover:border-primary/30 transition-colors duration-500">
      {/* Dynamic Background glow */}
      <div className="absolute -top-[20%] -left-[10%] w-[140%] h-[140%] bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-30 z-0 pointer-events-none animate-pulse-slow" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            AI Research Agent Working...
          </h3>
          <motion.span 
            className="text-lg font-black text-primary font-mono tracking-tighter bg-primary/10 px-3 py-1 rounded-full border border-primary/20"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {Math.round(progress)}%
          </motion.span>
        </div>
        
        <Progress value={progress} className="h-2 mb-8 bg-white/5 [&>div]:bg-gradient-to-r [&>div]:from-primary/60 [&>div]:to-primary" />
        
        <div className="space-y-6">
          {steps.map((step) => {
            const status = currentStep > step.id ? "complete" : currentStep === step.id ? "current" : "upcoming";
            
            return (
              <motion.div 
                key={step.id} 
                className="flex items-center gap-4 relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: step.id * 0.1, type: "spring", stiffness: 100 }}
              >
                {/* Connecting line */}
                {step.id !== steps.length && (
                  <div className={`absolute left-[11px] top-[24px] w-[2px] h-[34px] -z-10 ${currentStep > step.id ? 'bg-primary/50' : 'bg-white/10'}`} />
                )}

                <div className="bg-background rounded-full">
                  {status === "complete" ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)]">
                      <CheckCircle2 className="h-6 w-6 text-green-500 fill-green-500/20" />
                    </motion.div>
                  ) : status === "current" ? (
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  ) : (
                    <Circle className="h-6 w-6 text-muted-foreground/30" />
                  )}
                </div>
                
                <span className={`text-[15px] font-medium transition-all duration-300 ${
                  status === "complete" ? "text-muted-foreground/60" : 
                  status === "current" ? "text-foreground drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] tracking-wide" : "text-muted-foreground/30"
                }`}>
                  {step.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
