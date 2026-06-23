import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Providers from "@/components/providers";
import AppShell from "@/components/app-shell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Screenly — Streaming Catalog",
  description: "Discover movies and series through a modern streaming-style catalog experience.",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
    ],
    apple: {
      url: "/favicon.svg",
      type: "image/svg+xml",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-[#0e0f11] text-white" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
