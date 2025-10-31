import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { FirebaseClientProvider } from "@/firebase/client-provider";

export const metadata: Metadata = {
  title: "Veas Acoustics",
  description:
    "Expert Acoustic Consultants for Noise Assessment and Building Acoustics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* ✅ Direct Google Font Links (safe for all runtimes) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col"
        )}
        style={{
          fontFamily: `"Nunito", "Roboto", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
        }}
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
