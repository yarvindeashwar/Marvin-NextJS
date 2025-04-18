import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      {/* Logo */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
          className="dark:invert"
        />
      </div>
      
      {/* Main content */}
      <div className="w-full max-w-2xl mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Welcome to your Next.js App</h1>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Get started by editing <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded font-mono text-sm">src/app/page.tsx</code>
        </p>
        <p className="text-gray-700 dark:text-gray-300">Save and see your changes instantly with Tailwind CSS and dark mode support.</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-8">
        <a
          href="https://vercel.com/new"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          <Image src="/vercel.svg" alt="Vercel" width={16} height={16} className="dark:invert" />
          Deploy now
        </a>
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md transition-colors"
        >
          Read docs
        </a>
      </div>

      {/* Footer */}
      <footer className="flex flex-wrap justify-center gap-6 pt-6 border-t border-gray-200 dark:border-gray-700 w-full max-w-2xl text-gray-600 dark:text-gray-400">
        <a
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          <Image src="/file.svg" alt="" width={16} height={16} className="dark:invert" />
          Learn
        </a>
        <a
          href="https://vercel.com/templates"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          <Image src="/window.svg" alt="" width={16} height={16} className="dark:invert" />
          Examples
        </a>
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          <Image src="/globe.svg" alt="" width={16} height={16} className="dark:invert" />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
