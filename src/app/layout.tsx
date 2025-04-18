import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from 'next/headers';

import { ThemeProvider } from "../components/ThemeProvider";
import ThemeToggle from "../components/ThemeToggle";
import Sidebar from "../components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js with Tailwind Dark Mode",
  description: "A Next.js application with Tailwind CSS and dark mode support",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // We're not using the theme cookie directly anymore since ThemeProvider handles theme state
  // But we keep the server-side code to avoid hydration mismatch
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('theme')?.value;

  return (
    <html lang="en" suppressHydrationWarning className={themeCookie === 'dark' ? 'dark' : ''}>
      <body className={`${geistSans.variable} ${geistMono.variable} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col md:flex-row">
            {/* Sidebar component */}
            <div className="w-full md:w-64 md:flex-shrink-0 border-b md:border-r border-gray-200 dark:border-gray-800">
              <Sidebar />
            </div>
            
            {/* Main content area */}
            <div className="flex-1 flex flex-col min-w-0 min-h-screen">
              <header className="w-full flex justify-end p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
                <ThemeToggle />
              </header>
              <main className="flex-1 p-6 bg-white dark:bg-gray-900 transition-colors duration-200 overflow-auto">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
