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
  title: "Marvin - Modern SaaS Platform",
  description: "A cutting-edge SaaS platform with powerful analytics and AI capabilities",
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
      <body className={`${geistSans.variable} ${geistMono.variable} bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased min-h-screen`}>
        <ThemeProvider>
          <div className="flex h-screen overflow-hidden">
            {/* Sidebar component */}
            <div className="hidden md:block md:w-64 md:flex-shrink-0 h-full">
              <Sidebar />
            </div>
            
            {/* Mobile sidebar - shown only on small screens */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">M</div>
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Marvin</span>
                </div>
                <ThemeToggle />
              </div>
            </div>
            
            {/* Main content area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
              {/* Desktop header */}
              <header className="hidden md:flex items-center justify-end h-16 px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 transition-colors duration-200 sticky top-0 z-10">
                <ThemeToggle />
              </header>
              
              {/* Main content with subtle gradient background */}
              <main className="flex-1 overflow-auto px-4 py-6 md:px-8 md:py-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
                <div className="pt-14 md:pt-0"> {/* Add padding top on mobile to account for the fixed header */}
                  {children}
                </div>
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
