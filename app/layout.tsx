import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "NMLS Prep — Pass Your MLO Exam on Your Next Try",
  description:
    "The complete NMLS exam prep system with 660+ practice questions, 10 interactive lessons, and a 125-question mock exam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#f0f4f8] text-[#1e2d3d] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
