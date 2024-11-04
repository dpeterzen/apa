import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Apa.ai",
  description: "An Open Source AI-Powered Productivity Tool",
  icons: {
    icon: [
      {
        url: '/layout-dashboard.svg',
        type: 'image/svg+xml',
      }
    ],
    // Optional: Also add apple-touch-icon
    apple: [
      {
        url: '/layout-dashboard.svg',
        type: 'image/svg+xml',
      }
    ],
    // Optional: Add alternate PNG fallback for older browsers
    shortcut: [
      {
        url: '/layout-dashboard.svg',
        type: 'image/svg+xml',
      }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
