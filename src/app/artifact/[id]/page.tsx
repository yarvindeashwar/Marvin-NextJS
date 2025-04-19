"use client";

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Download, ArrowLeft } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';

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

export default function ArtifactPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params.id === 'string' ? params.id : '';
  const [artifact, setArtifact] = useState<ArtifactData | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const artifactContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // In a real app, this would fetch data from an API
    const artifactData = getMockArtifactData(id);
    setArtifact(artifactData);
  }, [id]);

  const handleExportPDF = () => {
    const element = artifactContentRef.current;
    if (!element) return;

    setIsExporting(true);

    const opt = {
      margin: [10, 10, 10, 10] as [number, number, number, number],
      filename: `${artifact?.title || 'artifact'}-${id}.pdf`,
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

  if (!artifact) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading artifact...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-900 text-gray-100 pb-12">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header with back button and export button */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Chat
          </button>
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            {isExporting ? 'Exporting...' : 'Export as PDF'}
          </button>
        </div>

        {/* Artifact content - this div will be converted to PDF */}
        <div 
          id="artifact-content" 
          ref={artifactContentRef}
          className="bg-gray-800 rounded-lg p-8 shadow-lg"
        >
          {/* Artifact header */}
          <div className="mb-8 border-b border-gray-700 pb-4">
            <h1 className="text-2xl font-bold text-white mb-2">{artifact.title}</h1>
            <p className="text-gray-400 mb-2">{artifact.description}</p>
            <p className="text-sm text-gray-500">
              Generated on {artifact.timestamp.toLocaleDateString()} at {artifact.timestamp.toLocaleTimeString()}
            </p>
          </div>

          {/* Insights section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Key Insights</h2>
            <ul className="space-y-2">
              {artifact.insights.map((insight, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-600 text-white rounded-full w-6 h-6 text-sm mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-300">{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Charts section */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Data Visualization</h2>
            <div className="space-y-8">
              {artifact.charts.map((chart) => (
                <div key={chart.id} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                  <h3 className="text-lg font-medium text-gray-300 mb-3">{chart.title}</h3>
                  <div className="h-[300px] w-full">
                    {renderChart(chart)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
