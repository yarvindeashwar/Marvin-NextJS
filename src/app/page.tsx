import Image from "next/image";
import { BarChart3, ArrowRight, Zap, LineChart, PieChart, Layers, Database, Shield, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col space-y-12">
      {/* Hero section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-8 md:p-10">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Welcome to Marvin Analytics
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Powerful insights and analytics for your business data. Connect, visualize, and make data-driven decisions with ease.  
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2 group">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-5 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-lg shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-200">
                  View Demo
                </button>
              </div>
            </div>
            <div className="flex-shrink-0 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="relative z-10 flex items-center justify-center h-full">
                  <div className="p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
                    <BarChart3 className="w-12 h-12 md:w-16 md:h-16 text-blue-500" strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-400/10 dark:bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-400/10 dark:bg-indigo-400/5 rounded-full blur-3xl"></div>
      </section>
      
      {/* Stats section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Data Sources", "Active Dashboards", "Daily Insights"].map((title, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-900">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-white">{title}</h3>
              {i === 0 && <Database className="w-5 h-5 text-blue-500" />}
              {i === 1 && <PieChart className="w-5 h-5 text-indigo-500" />}
              {i === 2 && <Zap className="w-5 h-5 text-amber-500" />}
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {i === 0 && "24"}
              {i === 1 && "8"}
              {i === 2 && "1.2K"}
            </p>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-500 font-medium">↑ 12%</span>
              <span className="text-gray-500 dark:text-gray-400 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </section>
      
      {/* Features section */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 transition-all">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Powerful Analytics Features</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Everything you need to understand your data and make better business decisions.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Real-time Dashboards", icon: <LineChart className="w-6 h-6" />, color: "text-blue-500" },
            { title: "Data Connectors", icon: <Database className="w-6 h-6" />, color: "text-indigo-500" },
            { title: "Advanced Visualizations", icon: <PieChart className="w-6 h-6" />, color: "text-purple-500" },
            { title: "Data Integration", icon: <Layers className="w-6 h-6" />, color: "text-teal-500" },
            { title: "Secure Access", icon: <Shield className="w-6 h-6" />, color: "text-amber-500" },
            { title: "Smart Search", icon: <Search className="w-6 h-6" />, color: "text-rose-500" }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-md transition-all">
              <div className={`w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4 ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA section */}
      <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 md:p-10 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
            <p className="text-blue-100 max-w-lg">Join thousands of companies using Marvin Analytics to transform their business data into actionable insights.</p>
          </div>
          <div className="flex-shrink-0">
            <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-lg hover:bg-gray-50 transition-colors duration-200">
              Start Free Trial
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
