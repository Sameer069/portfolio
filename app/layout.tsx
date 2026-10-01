import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sameer Das | Full-Stack Developer",
  description: "Full-Stack Developer specializing in MERN stack, Next.js, PostgreSQL, Prisma ORM, Redis, and AWS. Building real-time applications and scalable web systems.",
  keywords: ["full-stack developer", "MERN stack", "Next.js", "React", "Node.js", "PostgreSQL", "Sameer Das"],
  authors: [{ name: "Sameer Das" }],
  openGraph: {
    title: "Sameer Das | Full-Stack Developer",
    description: "Full-Stack Developer building real-time applications and scalable web systems",
    type: "website",
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0014',
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      style={{ backgroundColor: '#0a0014' }}
    >
      <head>
        <Script id="error-handler" strategy="beforeInteractive">
          {`
            window.addEventListener('error', function(e) {
              console.error('Global error caught:', e.error);
              if (e.error && e.error.message && e.error.message.includes('THREE')) {
                console.warn('Three.js error detected, attempting recovery...');
              }
            });
            
            window.addEventListener('unhandledrejection', function(e) {
              console.error('Unhandled promise rejection:', e.reason);
            });
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col" style={{ backgroundColor: '#0a0014' }}>{children}</body>
    </html>
  );
}
