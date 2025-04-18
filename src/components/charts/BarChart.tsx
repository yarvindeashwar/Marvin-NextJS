"use client";

import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

interface BarChartProps {
  title: string;
  xAxisData: string[];
  seriesData: number[];
  height?: string;
  width?: string;
  color?: string;
}

export default function BarChart({
  title,
  xAxisData,
  seriesData,
  height = '100%',
  width = '100%',
  color = '#10b981' // emerald-500
}: BarChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const option: EChartsOption = {
    title: {
      text: title,
      textStyle: {
        color: '#f9fafb', // gray-50
        fontWeight: 'normal',
        fontSize: 14
      },
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#1f2937', // gray-800
      borderColor: '#374151', // gray-700
      textStyle: {
        color: '#f9fafb' // gray-50
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: {
        lineStyle: {
          color: '#4b5563' // gray-600
        }
      },
      axisLabel: {
        color: '#9ca3af', // gray-400
        rotate: xAxisData.length > 8 ? 45 : 0 // Rotate labels if there are many
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#4b5563' // gray-600
        }
      },
      splitLine: {
        lineStyle: {
          color: '#374151' // gray-700
        }
      },
      axisLabel: {
        color: '#9ca3af' // gray-400
      }
    },
    series: [
      {
        data: seriesData,
        type: 'bar',
        itemStyle: {
          color: color,
          borderRadius: [4, 4, 0, 0] // Rounded top corners
        },
        emphasis: {
          itemStyle: {
            color: '#34d399' // emerald-400 (lighter on hover)
          }
        }
      }
    ],
    backgroundColor: 'transparent'
  };

  if (!mounted) return <div style={{ height, width }} className="flex items-center justify-center">Loading chart...</div>;

  return (
    <ReactECharts
      option={option}
      style={{ height, width }}
      opts={{ renderer: 'canvas' }}
    />
  );
}
