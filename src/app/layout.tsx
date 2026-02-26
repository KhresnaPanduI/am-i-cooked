import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Am I Cooked? | AI Job Replacement Calculator",
  description:
    "Describe your job title and what you do. We'll tell you how cooked you are. Find out if AI is coming for your career.",
  openGraph: {
    title: "Am I Cooked? | AI Job Replacement Calculator",
    description:
      "Find out how likely AI is to replace YOUR job. Describe what you do and get your score.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Am I Cooked? | AI Job Replacement Calculator",
    description:
      "Find out how likely AI is to replace YOUR job.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
