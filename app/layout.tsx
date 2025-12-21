import type React from "react"
import type { Metadata, Viewport } from "next"
import { Poppins } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"  // Comment this out if not using Vercel
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "C-LABS - Future-Ready STEM Education",
  description:
    "Empowering children with hands-on learning in Robotics, Coding, AI, IoT & Cybersecurity. Grade 1-12 STEM education programs.",
  keywords: [
    "STEM education",
    "robotics for kids",
    "coding classes",
    "AI learning",
    "IoT education",
    "cybersecurity for students",
  ],
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#1A73E8",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} font-sans antialiased`}>
        {children}
        {/* <Analytics /> */}  {/* Comment this out if not using Vercel */}
      </body>
    </html>
  )
}
