import type { Metadata } from "next";
import { Bebas_Neue, Outfit, Space_Grotesk, Sora } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hero",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-accent",
});

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Claudio Njalla | Influencer, Comedian, Actor & Musician",
  description:
    "Site officiel de Claudio Njalla — humoriste, influenceur, acteur et musicien camerounais suivi par plus de 4 millions de personnes.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      className={`h-full antialiased ${bebasNeue.variable} ${outfit.variable} ${spaceGrotesk.variable} ${sora.variable}`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
