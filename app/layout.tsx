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
  title: "Developer Portfolio | Creative Full-Stack Developer",
  description: "Modern portfolio showcasing cutting-edge web development with React, Three.js, and immersive 3D experiences. Specializing in creative development and interactive design.",
  keywords: ["web developer", "full-stack", "three.js", "react", "next.js", "3d web", "portfolio"],
  authors: [{ name: "SAM" }],
  openGraph: {
    title: "Developer Portfolio | Creative Full-Stack Developer",
    description: "Modern portfolio showcasing cutting-edge web development",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
