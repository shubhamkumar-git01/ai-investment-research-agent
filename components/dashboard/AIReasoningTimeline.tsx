import { motion } from "framer-motion";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const steps = [
  { id: 1, name: "Resolving Company & Ticker", duration: 1500 },
  { id: 2, name: "Gathering Financial Data", duration: 2500 },
  { id: 3, name: "Fetching Latest News", duration: 2000 },
  { id: 4, name: "Analyzing Business Model", duration: 3000 },
  { id: 5, name: "Performing SWOT Analysis", duration: 3500 },
  { id: 6, name: "Generating Final Recommendation", duration: 4000 },
];

export function AIReasoningTimeline({ isComplete }: { isComplete: boolean }) {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (isComplete) {
      setCurrentStep(steps.length + 1);
      return;
    }

    let timeout: NodeJS.Timeout;
    
    const runSteps = async () => {
      for (let i = 0; i < steps.length - 1; i++) {
        await new Promise(resolve => {
          timeout = setTimeout(resolve, steps[i].duration);
        });
        if (isComplete) break; // abort if completed externally
        setCurrentStep(prev => prev + 1);
      }
    };

    runSteps();

    return () => clearTimeout(timeout);
  }, [isComplete]);

  return (
    <div className="w-full max-w-2xl mx-auto my-12 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        AI Research Agent Working...
      </h3>
      <div className="space-y-6">
        {steps.map((step) => {
          const status = currentStep > step.id ? "complete" : currentStep === step.id ? "current" : "upcoming";
          
          return (
            <motion.div 
              key={step.id} 
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: step.id * 0.1 }}
            >
              {status === "complete" ? (
                <CheckCircle2 className="h-6 w-6 text-green-500" />
              ) : status === "current" ? (
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              ) : (
                <Circle className="h-6 w-6 text-muted-foreground" />
              )}
              
              <span className={`text-sm font-medium ${
                status === "complete" ? "text-muted-foreground line-through" : 
                status === "current" ? "text-foreground" : "text-muted-foreground"
              }`}>
                {step.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
