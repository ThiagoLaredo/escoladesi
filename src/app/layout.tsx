import type { Metadata } from "next";
import { Fraunces, Sora } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const sans = Sora({ variable: "--font-sans", subsets: ["latin"] });
const display = Fraunces({ variable: "--font-display", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Escoladesi | Educacao que faz sentido",
  description: "Uma escola de descobertas, escuta e aprendizagens vivas.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="pt-BR" className={`${sans.variable} ${display.variable}`}><body>{children}</body></html>;
}
