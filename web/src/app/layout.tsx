import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Alterado para @/ para garantir que a Vercel encontre o caminho a partir da raiz da pasta src
import CookieBanner from "@/components/CookieBanner"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FerramentasPro",
  description: "Soluções rápidas para cálculos do dia a dia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-[#020617]`}
    >
      <body className="min-h-full flex flex-col bg-[#020617] text-white">
        {children}
        
        {/* Banner de Cookies flutuando sobre o conteúdo */}
        <CookieBanner />
      </body>
    </html>
  );
}