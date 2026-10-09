import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bazar-Dor",
  description: "Your trusted daily bazar companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0b1120] text-white">
        <Toaster position="top-right" />

        <Navbar />

        <main className="min-h-screen pt-20">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}