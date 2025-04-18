"use client";

import Link from 'next/link';
import { Home, BarChart2, Database, MessageSquare, Settings, HelpCircle } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="h-full sticky top-0 flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-200 border-r border-gray-200 dark:border-gray-700">
      {/* Logo area */}
      <div className="p-5 flex items-center border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">M</div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Marvin</span>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        <div className="mb-6">
          <p className="px-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Main</p>
          <div className="space-y-1">
            <Link href="/" className="flex items-center gap-3 py-2 px-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white group transition-all">
              <Home className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
              <span>Dashboard</span>
            </Link>
            <Link href="/connectors" className="flex items-center gap-3 py-2 px-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white group transition-all">
              <Database className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
              <span>Connectors</span>
            </Link>
            <Link href="/dashboards" className="flex items-center gap-3 py-2 px-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white group transition-all">
              <BarChart2 className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
              <span>Analytics</span>
            </Link>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="px-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Tools</p>
          <div className="space-y-1">
            <Link href="/chat" className="flex items-center gap-3 py-2 px-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white group transition-all">
              <MessageSquare className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
              <span>Ask Marvin</span>
            </Link>
            <Link href="/settings" className="flex items-center gap-3 py-2 px-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white group transition-all">
              <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400" />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Link href="/help" className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          <HelpCircle className="w-4 h-4" />
          <span>Help & Support</span>
        </Link>
      </div>
    </aside>
  );
}
