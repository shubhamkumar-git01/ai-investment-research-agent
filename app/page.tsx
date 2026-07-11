"use client";

import { useState } from "react";
import { Hero } from "@/components/dashboard/Hero";
import { AIReasoningTimeline } from "@/components/dashboard/AIReasoningTimeline";
import { InvestmentReport } from "@/components/dashboard/InvestmentReport";
import { ThemeToggle } from "@/components/ThemeToggle";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (company: string) => {
    setLoading(true);
    setError(null);
    setReportData(null);

    try {
      const response = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName: company }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to generate report.");
      }

      setReportData(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
      toast.error("Research Failed", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-4 sm:p-8 lg:p-24 relative overflow-hidden">
      {/* Theme Toggle Top Right */}
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-50">
        <ThemeToggle />
      </div>

      {/* Background ambient lighting */}
      <div className="absolute top-0 -z-10 h-full w-full bg-background transition-colors duration-500">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.1)] opacity-50 blur-[80px]"></div>
        <div className="absolute top-auto bottom-0 left-0 right-auto h-[500px] w-[500px] translate-x-[10%] -translate-y-[20%] rounded-full bg-[rgba(59,130,246,0.1)] opacity-50 blur-[80px]"></div>
      </div>

      {!loading && !reportData && (
        <Hero onSearch={handleSearch} />
      )}

      {loading && (
        <div className="w-full mt-24">
          <AIReasoningTimeline isComplete={false} />
        </div>
      )}

      {error && !loading && (
        <Alert variant="destructive" className="max-w-xl mx-auto mt-12 bg-red-500/10 border-red-500/50">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Research Failed</AlertTitle>
          <AlertDescription>
            {error}
            <div className="mt-4">
              <button 
                onClick={() => setError(null)}
                className="text-sm underline hover:text-white"
              >
                Try another company
              </button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {reportData && !loading && (
        <div className="w-full">
          <InvestmentReport data={reportData} />
          <div className="flex justify-center mt-12 print:hidden">
            <button 
              onClick={() => setReportData(null)}
              className="text-muted-foreground hover:text-white transition-colors underline underline-offset-4"
            >
              Analyze another company
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
