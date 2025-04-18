"use client";

import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

interface LineChartProps {
  title: string;
  xAxisData: string[];
  seriesData: number[];
  height?: string;
  width?: string;
  color?: string;
}

export default function LineChart({
  title,
  xAxisData,
  seriesData,
  height = '100%',
  width = '100%',
  color = '#3b82f6' // blue-500
}: LineChartProps) {
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
        color: '#9ca3af' // gray-400
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
        type: 'line',
        smooth: true,
        itemStyle: {
          color: color
        },
        lineStyle: {
          color: color
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: color // Start color with opacity
              },
              {
                offset: 1,
                color: 'rgba(59, 130, 246, 0)' // End with transparent
              }
            ]
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
