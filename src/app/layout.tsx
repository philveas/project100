// src/app/layout.tsx (FINAL RESOLUTION)

import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { FirebaseClientProvider } from "@/firebase/client-provider";

// Google fonts via next/font
import { Nunito, Roboto } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-headline",
  display: "swap",
});

export const metadata: Metadata = {
  title: "veas Acoustics",
  description:
    "Expert Acoustic Consultants for Noise Assessment and Building Acoustics",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          nunito.variable, 
          roboto.variable,
          "min-h-screen bg-background font-body antialiased flex flex-col"
        )}
      >
        <FirebaseClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}