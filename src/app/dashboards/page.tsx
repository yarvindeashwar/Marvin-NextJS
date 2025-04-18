"use client";

import { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Import chart components
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';

// Import sample data
import {
  websiteTrafficData,
  conversionRateData,
  campaignPerformanceData,
  systemUptimeData,
  resourceUsageData,
  errorRatesData
} from '@/data/chartData';

export default function DashboardsPage() {
  const [activeTab, setActiveTab] = useState('Marketing');

  return (
    <div className="h-full">
      <h1 className="text-3xl font-bold mb-6">Dashboards</h1>
      
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-700 pb-1">
        <button 
          className={`mr-6 pb-2 text-lg font-medium ${activeTab === 'Marketing' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('Marketing')}>
          Marketing Dashboard
        </button>
        <button 
          className={`pb-2 text-lg font-medium ${activeTab === 'Operational' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
          onClick={() => setActiveTab('Operational')}>
          Operational Dashboard
        </button>
      </div>

      {/* Dashboard Content */}
      {activeTab === 'Marketing' ? <MarketingDashboard /> : <OperationalDashboard />}
    </div>
  );
}

function MarketingDashboard() {
  return (
    <DashboardGrid initialLayout="marketing">
      {/* Each div must have a key that matches the 'i' property in the layout */}
      <div key="traffic" className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-hidden h-full">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-white">Website Traffic</h3>
          <div className="drag-handle cursor-move text-xs text-gray-500">✥</div>
        </div>
        <div className="h-[calc(100%-2rem)]">
          <LineChart 
            title="Monthly Visitors" 
            xAxisData={websiteTrafficData.xAxisData} 
            seriesData={websiteTrafficData.seriesData} 
            color="#3b82f6" 
          />
        </div>
      </div>
      
      <div key="conversion" className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-hidden h-full">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-white">Conversion Rate</h3>
          <div className="drag-handle cursor-move text-xs text-gray-500">✥</div>
        </div>
        <div className="h-[calc(100%-2rem)]">
          <LineChart 
            title="Monthly Conversion Rate (%)" 
            xAxisData={conversionRateData.xAxisData} 
            seriesData={conversionRateData.seriesData} 
            color="#ec4899" 
          />
        </div>
      </div>
      
      <div key="campaign" className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-hidden h-full">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-white">Campaign Performance</h3>
          <div className="drag-handle cursor-move text-xs text-gray-500">✥</div>
        </div>
        <div className="h-[calc(100%-2rem)]">
          <PieChart 
            title="Channel Distribution" 
            data={campaignPerformanceData.data} 
          />
        </div>
      </div>
    </DashboardGrid>
  );
}

function OperationalDashboard() {
  return (
    <DashboardGrid initialLayout="operational">
      {/* Each div must have a key that matches the 'i' property in the layout */}
      <div key="uptime" className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-hidden h-full">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-white">System Uptime</h3>
          <div className="drag-handle cursor-move text-xs text-gray-500">✥</div>
        </div>
        <div className="h-[calc(100%-2rem)]">
          <LineChart 
            title="Monthly Uptime (%)" 
            xAxisData={systemUptimeData.xAxisData} 
            seriesData={systemUptimeData.seriesData} 
            color="#10b981" 
          />
        </div>
      </div>
      
      <div key="resources" className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-hidden h-full">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-white">Resource Usage</h3>
          <div className="drag-handle cursor-move text-xs text-gray-500">✥</div>
        </div>
        <div className="h-[calc(100%-2rem)]">
          <BarChart 
            title="Resource Utilization (%)" 
            xAxisData={resourceUsageData.xAxisData} 
            seriesData={resourceUsageData.seriesData} 
            color="#f59e0b" 
          />
        </div>
      </div>
      
      <div key="errors" className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-hidden h-full">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium text-white">Error Rates</h3>
          <div className="drag-handle cursor-move text-xs text-gray-500">✥</div>
        </div>
        <div className="h-[calc(100%-2rem)]">
          <LineChart 
            title="Monthly Error Rate" 
            xAxisData={errorRatesData.xAxisData} 
            seriesData={errorRatesData.seriesData} 
            color="#ef4444" 
          />
        </div>
      </div>
    </DashboardGrid>
  );
}

// Responsive Grid Layout with width provider
const ResponsiveGridLayout = WidthProvider(Responsive);

// Layout configurations for different dashboard types
const layouts = {
  marketing: {
    lg: [
      { i: 'traffic', x: 0, y: 0, w: 4, h: 2 },
      { i: 'conversion', x: 4, y: 0, w: 4, h: 2 },
      { i: 'campaign', x: 8, y: 0, w: 4, h: 2 },
    ],
    md: [
      { i: 'traffic', x: 0, y: 0, w: 6, h: 2 },
      { i: 'conversion', x: 6, y: 0, w: 6, h: 2 },
      { i: 'campaign', x: 0, y: 2, w: 12, h: 2 },
    ],
    sm: [
      { i: 'traffic', x: 0, y: 0, w: 12, h: 2 },
      { i: 'conversion', x: 0, y: 2, w: 12, h: 2 },
      { i: 'campaign', x: 0, y: 4, w: 12, h: 2 },
    ],
  },
  operational: {
    lg: [
      { i: 'uptime', x: 0, y: 0, w: 4, h: 2 },
      { i: 'resources', x: 4, y: 0, w: 4, h: 2 },
      { i: 'errors', x: 8, y: 0, w: 4, h: 2 },
    ],
    md: [
      { i: 'uptime', x: 0, y: 0, w: 6, h: 2 },
      { i: 'resources', x: 6, y: 0, w: 6, h: 2 },
      { i: 'errors', x: 0, y: 2, w: 12, h: 2 },
    ],
    sm: [
      { i: 'uptime', x: 0, y: 0, w: 12, h: 2 },
      { i: 'resources', x: 0, y: 2, w: 12, h: 2 },
      { i: 'errors', x: 0, y: 4, w: 12, h: 2 },
    ],
  },
};

// DashboardGrid component for layout management
interface DashboardGridProps {
  children: React.ReactNode[];
  initialLayout: 'marketing' | 'operational';
}

function DashboardGrid({ children, initialLayout }: DashboardGridProps) {
  const [mounted, setMounted] = useState(false);
  
  // This prevents hydration errors with react-grid-layout
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return <div className="grid grid-cols-1 gap-6">{children}</div>;
  
  return (
    <div className="h-full w-full">
      <ResponsiveGridLayout
        className="layout w-full"
        layouts={layouts[initialLayout]}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }}
        rowHeight={150}
        isDraggable
        isResizable
        margin={[16, 16]}
        containerPadding={[0, 0]}
      >
        {children}
      </ResponsiveGridLayout>
    </div>
  );
}
