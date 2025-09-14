import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pokédex",
    template: "%s | Pokédex",
  },
  description:
    "Pokédex built with Next.js App Router, TypeScript and Tailwind. Search Pokémon, view details, stats, weaknesses and evolutions.",
  keywords: [
    "Pokédex",
    "Pokemon",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind",
    "PokeAPI",
  ],
  openGraph: {
    title: "Pokédex",
    description:
      "Pokédex built with Next.js App Router, TypeScript and Tailwind.",
    type: "website",
    images: [
      {
        url: "/image/background.webp",
        width: 1200,
        height: 630,
        alt: "Pokédex",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pokédex",
    description:
      "Pokédex built with Next.js App Router, TypeScript and Tailwind.",
    images: ["/image/background.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="mx-auto w-[1100px]">{children}</div>
      </body>
    </html>
  );
}
