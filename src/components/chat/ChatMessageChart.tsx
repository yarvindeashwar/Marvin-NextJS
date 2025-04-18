"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import LineChart from '../charts/LineChart';
import BarChart from '../charts/BarChart';
import PieChart from '../charts/PieChart';

// Types for chart data
interface ChartData {
  id: string;
  type: 'line' | 'bar' | 'pie';
  title: string;
  xAxisData?: string[];
  seriesData?: number[];
  data?: { name: string; value: number }[];
}

interface ChatMessageChartProps {
  chart: ChartData;
  onAddToDashboard: (chart: ChartData) => void;
}

export default function ChatMessageChart({ chart, onAddToDashboard }: ChatMessageChartProps) {
  const [isHovered, setIsHovered] = useState(false);

  const renderChart = () => {
    switch (chart.type) {
      case 'line':
        return (
          <LineChart
            title={chart.title}
            xAxisData={chart.xAxisData || []}
            seriesData={chart.seriesData || []}
            height="200px"
          />
        );
      case 'bar':
        return (
          <BarChart
            title={chart.title}
            xAxisData={chart.xAxisData || []}
            seriesData={chart.seriesData || []}
            height="200px"
          />
        );
      case 'pie':
        return (
          <PieChart
            title={chart.title}
            data={chart.data || []}
            height="200px"
          />
        );
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div 
      className="mt-4 border border-gray-700 rounded-lg p-2 bg-gray-900 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium text-gray-300">{chart.title}</h4>
        <button 
          onClick={() => onAddToDashboard(chart)}
          className={`text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-opacity ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Plus className="w-3 h-3" /> Add to Dashboard
        </button>
      </div>
      <div className="h-48 w-full bg-gray-800 rounded">
        {renderChart()}
      </div>
    </div>
  );
}
