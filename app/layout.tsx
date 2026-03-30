import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Claudio Njalla | Influencer, Comedian, Actor & Musician",
  description:
    "Site officiel de Claudio Njalla — humoriste, influenceur, acteur et musicien camerounais suivi par plus de 4 millions de personnes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased" suppressHydrationWarning>
      <body
        className="flex min-h-full flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-500"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
