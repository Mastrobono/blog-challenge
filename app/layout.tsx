import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import NavbarClient from "@/components/layout/NavbarClient";
import Footer from "@/components/layout/Footer";
import { QueryClientProvider } from "@/providers/QueryClientProvider";
import { LenisProvider } from "@/providers/LenisProvider";
import { ModalProvider } from "@/contexts/ModalContext";
import { ModalWrapper } from "@/components/features/ModalWrapper";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lite-Tech",
  description: "Tech news and articles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <LenisProvider>
          <QueryClientProvider>
            <ModalProvider>
              <NavbarClient />
              {children}
              <ModalWrapper />
            </ModalProvider>
          </QueryClientProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
