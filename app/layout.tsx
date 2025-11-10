import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import "./v0-globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Aculis - Data Analysis Platform for Investors",
  description:
    "Building the cognitive infrastructure of finance. AI-powered data analysis platform for hedge funds and banks.",
  generator: "v0.app",
  icons: {
    icon: "https://framerusercontent.com/images/7XXx01QyM6zoyXMhoAnEypflLrs.png",
    apple: "https://framerusercontent.com/images/7XXx01QyM6zoyXMhoAnEypflLrs.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
