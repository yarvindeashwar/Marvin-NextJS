"use client";

import { useState, useRef, useEffect } from 'react';
import { X, Download } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import PieChart from './charts/PieChart';

// Add custom scrollbar styles
import './styles/customScrollbar.css';

// Types for artifact data
interface ChartData {
  id: string;
  type: 'line' | 'bar' | 'pie';
  title: string;
  xAxisData?: string[];
  seriesData?: number[];
  data?: { name: string; value: number }[];
  name?: string;
  value?: number;
}

interface ArtifactData {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  charts: ChartData[];
  insights: string[];
}

interface ArtifactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  artifactId: string;
  autoOpened?: boolean; // Track if the modal was automatically opened
}

// Mock data for demonstration purposes
// In a real app, this would be fetched from an API or state management
const getMockArtifactData = (id: string): ArtifactData => {
  return {
    id,
    title: "Revenue Analysis Report",
    description: "An in-depth analysis of revenue trends and contributing factors",
    timestamp: new Date(),
    charts: [
      {
        id: 'chart-1',
        type: 'line',
        title: 'Weekly Revenue Trend',
        xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        seriesData: [820, 932, 901, 834, 1290, 1330, 1320]
      },
      {
        id: 'chart-2',
        type: 'bar',
        title: 'Revenue by Product Category',
        xAxisData: ['Electronics', 'Clothing', 'Home', 'Beauty', 'Sports'],
        seriesData: [5200, 3800, 2900, 1800, 2300]
      },
      {
        id: 'chart-3',
        type: 'pie',
        title: 'Revenue Distribution by Channel',
        data: [
          { name: 'Online Store', value: 43 },
          { name: 'Marketplace', value: 32 },
          { name: 'Retail', value: 15 },
          { name: 'Wholesale', value: 10 }
        ]
      }
    ],
    insights: [
      "Revenue increased by 15% compared to the previous week",
      "Electronics category continues to be the top performer",
      "Online store remains the primary revenue channel at 43%",
      "Weekend sales show consistent growth over the past month",
      "Recommendation: Focus marketing efforts on the Clothing category to boost its performance"
    ]
  };
};

export default function ArtifactDrawer({ isOpen, onClose, artifactId, autoOpened = false }: ArtifactDrawerProps) {
  const [artifact, setArtifact] = useState<ArtifactData | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const artifactContentRef = useRef<HTMLDivElement>(null);

  // Load artifact data when modal opens
  useEffect(() => {
    if (isOpen && artifactId) {
      // In a real app, this would fetch data from an API
      const artifactData = getMockArtifactData(artifactId);
      setArtifact(artifactData);
      
      // Start entrance animation
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, artifactId]);

  const handleExportPDF = () => {
    const element = artifactContentRef.current;
    if (!element) return;

    setIsExporting(true);

    const opt = {
      margin: [10, 10, 10, 10] as [number, number, number, number],
      filename: `${artifact?.title || 'artifact'}-${artifactId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#1a202c' // Dark background
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as 'portrait' }
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        setIsExporting(false);
      })
      .catch((error: Error) => {
        console.error('Error generating PDF:', error);
        setIsExporting(false);
      });
  };

  const renderChart = (chart: ChartData) => {
    switch (chart.type) {
      case 'line':
        return (
          <LineChart
            title={chart.title}
            xAxisData={chart.xAxisData || []}
            seriesData={chart.seriesData || []}
            height="300px"
          />
        );
      case 'bar':
        return (
          <BarChart
            title={chart.title}
            xAxisData={chart.xAxisData || []}
            seriesData={chart.seriesData || []}
            height="300px"
          />
        );
      case 'pie':
        return (
          <PieChart
            title={chart.title}
            data={chart.data || []}
            height="300px"
          />
        );
      default:
        return <div>Unsupported chart type</div>;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay that only darkens the background slightly */}
      <div 
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-30' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Side drawer that slides in from the right */}
      <div 
        className={`fixed top-0 right-0 z-50 h-full w-full sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/3 bg-gray-900 shadow-2xl flex flex-col overflow-hidden 
                   transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} 
                   ${isAnimating ? 'opacity-90' : 'opacity-100'}`}
      >
        {/* Modal header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <div className="flex items-center">
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors mr-3"
              aria-label="Close artifact drawer"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold text-white truncate">
              {artifact?.title || 'Analysis Artifact'}
              {autoOpened && <span className="ml-2 text-xs text-blue-400">(Auto-opened)</span>}
            </h2>
          </div>
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-3 py-1.5 rounded-lg transition-colors text-sm"
          >
            <Download className="w-4 h-4 mr-1.5" />
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </button>
        </div>
        
        {/* Drawer content - scrollable */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {!artifact ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-400">Loading artifact...</p>
              </div>
            </div>
          ) : (
            <div 
              id="artifact-content" 
              ref={artifactContentRef}
              className="bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              {/* Artifact header */}
              <div className="mb-6 border-b border-gray-700 pb-4">
                <h1 className="text-xl font-bold text-white mb-2">{artifact.title}</h1>
                <p className="text-gray-400 mb-2">{artifact.description}</p>
                <p className="text-sm text-gray-500">
                  Generated on {artifact.timestamp.toLocaleDateString()} at {artifact.timestamp.toLocaleTimeString()}
                </p>
              </div>

              {/* Insights section */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-white mb-3">Key Insights</h2>
                <ul className="space-y-2">
                  {artifact.insights.map((insight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center bg-blue-600 text-white rounded-full w-5 h-5 text-xs mr-2.5 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-gray-300 text-sm">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Charts section */}
              <div>
                <h2 className="text-lg font-semibold text-white mb-3">Data Visualization</h2>
                <div className="space-y-6">
                  {artifact.charts.map((chart) => (
                    <div key={chart.id} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                      <h3 className="text-base font-medium text-gray-300 mb-2">{chart.title}</h3>
                      <div className="h-[300px] w-full">
                        {renderChart(chart)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
