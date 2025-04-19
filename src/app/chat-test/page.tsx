"use client";

import { useState } from 'react';
import { MessageSquare, Send, ExternalLink } from 'lucide-react';
import ChatMessageChart from '@/components/chat/ChatMessageChart';
import ArtifactModal from '@/components/ArtifactModal';

// Types for our test
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChartData {
  id: string;
  type: 'line' | 'bar' | 'pie';
  title: string;
  xAxisData?: string[];
  seriesData?: number[];
  data?: { name: string; value: number }[];
}

export default function ChatTestPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isArtifactModalOpen, setIsArtifactModalOpen] = useState(false);
  const [currentArtifactId, setCurrentArtifactId] = useState('');

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };
    setMessages([...messages, userMessage]);
    
    // Clear input and set loading
    setInput('');
    setIsLoading(true);
    
    // Simulate assistant response
    setTimeout(() => {
      let responseContent = "I'm Marvin, your AI assistant. ";
      let chartData: ChartData | null = null;
      
      // Generate different responses based on input
      if (input.toLowerCase().includes('revenue')) {
        responseContent += "Based on our data, revenue decreased by 12% last week compared to the previous week. The main factors were:\n\n" +
          "1. Seasonal fluctuation (accounts for ~60% of the drop)\n" +
          "2. Technical issues with the payment processor on Tuesday (accounts for ~30%)\n" +
          "3. Increased competition in the market (accounts for ~10%)\n\n" +
          "[CHART:Revenue Trend]\n\n" +
          "I've prepared a detailed analysis artifact with multiple visualizations to help you understand the revenue decline better.\n\n" +
          "[ARTIFACT:revenue-analysis-" + Date.now() + "]\n\n" +
          "You can view the full analysis by clicking the link below.";
          
        chartData = {
          id: 'chart-' + Date.now(),
          type: 'line',
          title: 'Revenue Trend',
          xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          seriesData: [820, 932, 901, 934, 1290, 1330, 1320]
        };
      } else if (input.toLowerCase().includes('marketing') || input.toLowerCase().includes('campaign')) {
        responseContent += "The last marketing campaign performed 23% better than previous ones. Key metrics:\n\n" +
          "- Click-through rate: 4.2% (up from 3.1%)\n" +
          "- Conversion rate: 2.8% (up from 2.1%)\n" +
          "- ROI: 320% (up from 240%)\n\n" +
          "[CHART:Campaign Performance]\n\n" +
          "The improvements came primarily from better targeting and messaging refinement.";
          
        chartData = {
          id: 'chart-' + Date.now(),
          type: 'bar',
          title: 'Campaign Performance',
          xAxisData: ['CTR', 'Conversion', 'ROI', 'Engagement', 'Reach'],
          seriesData: [4.2, 2.8, 3.2, 5.1, 6.7]
        };
      } else {
        responseContent += "I can help you analyze your business data, create visualizations, and provide insights. " +
          "Ask me about revenue, marketing campaigns, user engagement, or any other business metrics you're interested in.";
      }
      
      // Add assistant message
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: responseContent
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setIsLoading(false);
      
      console.log('Test page response:', responseContent);
      console.log('Chart data:', chartData);
    }, 1000);
  };

  // Function to handle adding a chart to dashboard
  const handleAddToDashboard = (chart: ChartData) => {
    alert(`Chart "${chart.title}" added to dashboard!`);
  };

  // Function to extract chart data from message
  const getChartFromMessage = (message: Message): ChartData | null => {
    if (message.role !== 'assistant') return null;
    
    const chartMatch = message.content.match(/\[CHART:(.*?)\]/);
    if (!chartMatch) return null;
    
    const chartTitle = chartMatch[1];
    
    if (chartTitle.toLowerCase().includes('revenue')) {
      return {
        id: 'chart-' + Date.now(),
        type: 'line',
        title: chartTitle,
        xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        seriesData: [820, 932, 901, 934, 1290, 1330, 1320]
      };
    } else if (chartTitle.toLowerCase().includes('campaign') || chartTitle.toLowerCase().includes('marketing')) {
      return {
        id: 'chart-' + Date.now(),
        type: 'bar',
        title: chartTitle,
        xAxisData: ['CTR', 'Conversion', 'ROI', 'Engagement', 'Reach'],
        seriesData: [4.2, 2.8, 3.2, 5.1, 6.7]
      };
    } else {
      return {
        id: 'chart-' + Date.now(),
        type: 'pie',
        title: chartTitle,
        data: [
          { name: 'Category A', value: 335 },
          { name: 'Category B', value: 310 },
          { name: 'Category C', value: 234 },
          { name: 'Category D', value: 135 },
          { name: 'Category E', value: 1548 }
        ]
      };
    }
  };

  // Function to clean content (remove chart and artifact markers)
  const cleanContent = (content: string): string => {
    return content
      .replace(/\[CHART:.*?\]/g, '')
      .replace(/\[ARTIFACT:.*?\]/g, '');
  };
  
  // Function to check if message has an artifact
  const hasArtifact = (message: Message): { hasArtifact: boolean, artifactId: string } => {
    if (message.role !== 'assistant') return { hasArtifact: false, artifactId: '' };
    
    const artifactMatch = message.content.match(/\[ARTIFACT:(.*?)\]/i);
    if (!artifactMatch) return { hasArtifact: false, artifactId: '' };
    
    return { 
      hasArtifact: true, 
      artifactId: artifactMatch[1] || Date.now().toString() 
    };
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)]">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-500" />
          <h1 className="text-xl font-semibold">Chat Test Page</h1>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <MessageSquare className="w-12 h-12 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Test Chat Functionality</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md">
              Try typing "Why did revenue fall last week?" or "How effective was our last marketing campaign?" to test chart display.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              const chartData = getChartFromMessage(message);
              const content = cleanContent(message.content);
              
              return (
                <div 
                  key={message.id} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`rounded-lg p-4 max-w-[80%] ${
                      message.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                    }`}
                  >
                    {content}
                    
                    {/* Render chart if present */}
                    {chartData && (
                      <ChatMessageChart 
                        chart={chartData} 
                        onAddToDashboard={handleAddToDashboard} 
                      />
                    )}
                    
                    {/* Render artifact link if present */}
                    {hasArtifact(message).hasArtifact && (
                      <div className="mt-4 border-t border-gray-700 pt-3">
                        <button
                          onClick={() => {
                            setCurrentArtifactId(hasArtifact(message).artifactId);
                            setIsArtifactModalOpen(true);
                          }}
                          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Analysis Artifact
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Input Area */}
      <form 
        onSubmit={handleSubmit} 
        className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4"
      >
        <div className="flex items-center gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a test message..."
            className="flex-1 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg p-3 resize-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none text-gray-900 dark:text-gray-100 min-h-[2.5rem] max-h-32"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as any);
              }
            }}
          />
          <button 
            type="submit" 
            disabled={isLoading || input.trim() === ''}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-3 rounded-lg transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Artifact Modal */}
      <ArtifactModal 
        isOpen={isArtifactModalOpen}
        onClose={() => setIsArtifactModalOpen(false)}
        artifactId={currentArtifactId}
      />
    </div>
  );
}
