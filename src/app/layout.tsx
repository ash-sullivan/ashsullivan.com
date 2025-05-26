import Menu from './components/Menu';
import type { Metadata } from "next";
import { Geist, Geist_Mono, Saira } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const saira = Saira({
  subsets: ["latin"],
  weight: "600",

});

export const metadata: Metadata = {
  title: "Ash Sullivan",
  description: "Neat. 📸",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="sticky top-0 z-50">
        <header className="flex justify-between items-center bg-linear-to-b from-violet-800 to-indigo-800">
          <h1 className={`${saira.className} text-5xl p-4 flex-none antialiased`}>Ash Sullivan</h1>
          <Menu />
        </header> 
        <hr className="border-black" />
      </div>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <center>&copy; 2025 Ash Sullivan</center>
      </footer>
    </>
  );
}
