"use client";

import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-full h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200">
      <div className="p-4 text-2xl font-bold border-b border-gray-200 dark:border-gray-700">Marvin</div>
      <nav className="flex flex-col p-4 space-y-1">
        <Link href="/connectors" className="block py-2 px-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          Connectors
        </Link>
        <Link href="/dashboards" className="block py-2 px-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          Dashboards
        </Link>
        <Link href="#" className="block py-2 px-3 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          Ask Marvin
        </Link>
      </nav>
    </aside>
  );
}
