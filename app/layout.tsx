import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import "./globals.css";
import NavbarClient from "@/components/layout/NavbarClient";
import { QueryClientProvider } from "@/providers/QueryClientProvider";
import { LenisProvider } from "@/providers/LenisProvider";
import { ModalProvider } from "@/contexts/ModalContext";
import { ModalWrapper } from "@/components/features/ModalWrapper";
import { ViewTransitionProvider } from "@/contexts/ViewTransitionContext";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lite-Tech | Tech News and Articles",
  description: "Stay updated with the latest tech news, articles, and insights. Explore technology trends, innovations, and expert analysis.",
  icons: {
    icon: "/icon.svg",
  },
  keywords: ["tech news", "technology", "articles", "tech blog", "innovation", "tech trends"],
  authors: [{ name: "Lite-Tech" }],
  creator: "Lite-Tech",
  publisher: "Lite-Tech",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://lite-tech.com"),
  openGraph: {
    title: "Lite-Tech | Tech News and Articles",
    description: "Stay updated with the latest tech news, articles, and insights.",
    type: "website",
    locale: "en_US",
    siteName: "Lite-Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lite-Tech | Tech News and Articles",
    description: "Stay updated with the latest tech news, articles, and insights.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" translate="no" className={`${spaceGrotesk.variable} ${spaceGrotesk.className}`}>
        <body className="antialiased">
          <ViewTransitionProvider>
            <LenisProvider>
              <QueryClientProvider>
                <ModalProvider>
                  <NavbarClient />
                  {children}
                  <ModalWrapper />
                </ModalProvider>
              </QueryClientProvider>
            </LenisProvider>
          </ViewTransitionProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
