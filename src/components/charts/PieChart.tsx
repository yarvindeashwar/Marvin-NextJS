"use client";

import { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts';

interface PieChartProps {
  title: string;
  data: Array<{ name: string; value: number }>;
  height?: string;
  width?: string;
  colors?: string[];
}

export default function PieChart({
  title,
  data,
  height = '100%',
  width = '100%',
  colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
}: PieChartProps) {
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
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
      backgroundColor: '#1f2937', // gray-800
      borderColor: '#374151', // gray-700
      textStyle: {
        color: '#f9fafb' // gray-50
      }
    },
    legend: {
      orient: 'vertical',
      right: '5%',
      top: 'middle',
      textStyle: {
        color: '#9ca3af' // gray-400
      }
    },
    series: [
      {
        name: title,
        type: 'pie',
        radius: ['40%', '70%'], // Donut chart
        center: ['40%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#1f2937', // gray-800
          borderWidth: 2
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '12',
            fontWeight: 'bold',
            color: '#f9fafb' // gray-50
          }
        },
        labelLine: {
          show: false
        },
        data: data,
        color: colors
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
