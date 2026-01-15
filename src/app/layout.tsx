// src/app/layout.tsx

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/Header.server";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import { nunito, roboto } from "./fonts";

/* --------------------------------------------------
 * ROOT METADATA (SAFE DEFAULTS ONLY)
 * -------------------------------------------------- */
export const metadata: Metadata = {
  metadataBase: new URL("https://www.veasacoustics.co.uk"),

  title: {
    default: "Veas Acoustics",
    template: "%s | Veas Acoustics",
  },

  description:
    "Specialist acoustic consultancy delivering noise assessment, design and compliance testing services across the UK.",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },

  manifest: "/favicon/site.webmanifest",

  openGraph: {
    siteName: "Veas Acoustics",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    site: "@veasacoustics",
    creator: "@veasacoustics",
  },

  formatDetection: {
    telephone: false,
  },
};

/* --------------------------------------------------
 * VIEWPORT (themeColor belongs here in Next 16)
 * -------------------------------------------------- */
export const viewport: Viewport = {
  themeColor: "#038C6D",
};

/* --------------------------------------------------
 * ROOT LAYOUT
 * -------------------------------------------------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "scroll-smooth bg-background text-foreground",
        nunito.variable,
        roboto.variable
      )}
    >
      <body className="min-h-screen antialiased flex flex-col">
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
