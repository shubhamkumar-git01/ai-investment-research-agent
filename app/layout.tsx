import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InsideIIM AI Investment Research Agent",
  description: "AI-powered investment research and reporting.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Force dark mode for premium SaaS look
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background antialiased selection:bg-primary selection:text-primary-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
