"use client";

import { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import { MessageSquare, Send, ChevronDown, ChevronUp, History, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import ChatMessageChart from '@/components/chat/ChatMessageChart';
import ArtifactDrawer from '@/components/ArtifactDrawer';

// Types for our chat interface
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  charts?: ChartData[];
  timestamp: Date;
  hasArtifact?: boolean;
  artifactId?: string;
}

interface ChartData {
  id: string;
  type: 'line' | 'bar' | 'pie';
  title: string;
  xAxisData?: string[];
  seriesData?: number[];
  data?: { name: string; value: number }[];
}

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

export default function ChatPage() {
  // State for chat history panel
  const [showHistory, setShowHistory] = useState(false);
  const [isArtifactModalOpen, setIsArtifactModalOpen] = useState(false);
  const [currentArtifactId, setCurrentArtifactId] = useState('');
  const [isArtifactAutoOpened, setIsArtifactAutoOpened] = useState(false);
  
  // Reference to message container for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Mock chat history (would be fetched from API/localStorage in a real app)
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Revenue Analysis',
      lastMessage: 'Why did revenue fall last week?',
      timestamp: new Date(Date.now() - 86400000) // 1 day ago
    },
    {
      id: '2',
      title: 'Marketing Campaign',
      lastMessage: 'How effective was our last campaign?',
      timestamp: new Date(Date.now() - 172800000) // 2 days ago
    }
  ]);

  // Use Vercel's AI SDK for chat functionality
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat', // This will be our API endpoint for the chat
    onFinish: (message) => {
      console.log('Message completed:', message);
      // Check if this is a new conversation and add it to history if so
      if (messages.length <= 1) {
        const newSession: ChatSession = {
          id: Date.now().toString(),
          title: messages[0]?.content.slice(0, 30) + '...',
          lastMessage: message.content.slice(0, 30) + '...',
          timestamp: new Date()
        };
        setChatSessions([newSession, ...chatSessions]);
      }
      
      // Check if the message contains an artifact marker and automatically open it
      const artifactMatch = message.content.match(/\[ARTIFACT:(.*?)\]/i);
      if (artifactMatch) {
        const artifactId = artifactMatch[1] || Date.now().toString();
        setCurrentArtifactId(artifactId);
        setIsArtifactAutoOpened(true);
        setIsArtifactModalOpen(true);
      }
    },
    onError: (error) => {
      console.error('Chat error:', error);
    }
  });
  
  // Debug: Log messages when they change
  useEffect(() => {
    console.log('Current messages:', messages);
  }, [messages]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Function to handle adding a chart to dashboard
  const handleAddToDashboard = (chart: ChartData) => {
    // In a real app, this would call an API or update global state
    alert(`Chart "${chart.title}" added to dashboard!`);
    // Example implementation would dispatch to a context or call an API
  };

  // Function to load a previous chat session
  const loadChatSession = (sessionId: string) => {
    // In a real app, this would fetch the messages for this session
    alert(`Loading chat session ${sessionId}`);
    // For now, we'll just close the history panel
    setShowHistory(false);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)] relative">
      {/* Chat History Panel - Collapsible */}
      <div 
        className={`absolute md:relative z-10 h-full bg-gray-800 dark:bg-gray-900 border-r border-gray-700 transition-all duration-300 ${
          showHistory ? 'w-64' : 'w-0 md:w-0 overflow-hidden'
        }`}
      >
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <History className="w-4 h-4" />
            Chat History
          </h2>
        </div>
        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          {chatSessions.map((session) => (
            <button
              key={session.id}
              onClick={() => loadChatSession(session.id)}
              className="w-full text-left p-3 hover:bg-gray-700 border-b border-gray-700"
            >
              <h3 className="font-medium text-gray-200 truncate">{session.title}</h3>
              <p className="text-sm text-gray-400 truncate">{session.lastMessage}</p>
              <span className="text-xs text-gray-500">
                {session.timestamp.toLocaleDateString()}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            <h1 className="text-xl font-semibold">Ask Marvin</h1>
          </div>
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle chat history"
          >
            {showHistory ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <MessageSquare className="w-12 h-12 text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Ask Marvin Anything</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Ask questions about your data, request visualizations, or get insights about your business metrics.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => {
                // Parse message content to extract any chart data
                const chartMatch = message.role === 'assistant' && 
                  message.content.match(/\[CHART:(.*?)\]/);
                
                // Generate chart data based on the chart title
                let chartData;
                if (chartMatch) {
                  const chartTitle = chartMatch[1];
                  if (chartTitle.toLowerCase().includes('revenue')) {
                    chartData = {
                      id: 'chart-' + Date.now(),
                      type: 'line' as const,
                      title: chartTitle,
                      xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                      seriesData: [820, 932, 901, 934, 1290, 1330, 1320]
                    };
                  } else if (chartTitle.toLowerCase().includes('campaign') || 
                             chartTitle.toLowerCase().includes('marketing')) {
                    chartData = {
                      id: 'chart-' + Date.now(),
                      type: 'bar' as const,
                      title: chartTitle,
                      xAxisData: ['CTR', 'Conversion', 'ROI', 'Engagement', 'Reach'],
                      seriesData: [4.2, 2.8, 3.2, 5.1, 6.7]
                    };
                  } else {
                    chartData = {
                      id: 'chart-' + Date.now(),
                      type: 'pie' as const,
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
                }
                
                // Check if the message contains an artifact marker
                const artifactMatch = message.content.match(/\[ARTIFACT:(.*?)\]/i);
                let hasArtifact = false;
                let artifactId = '';
                
                if (artifactMatch) {
                  hasArtifact = true;
                  artifactId = artifactMatch[1] || Date.now().toString();
                }
                
                // Clean content (remove chart and artifact markers)
                const cleanContent = message.content
                  .replace(/\[CHART:.*?\]/g, '')
                  .replace(/\[ARTIFACT:.*?\]/g, '');

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
                      {cleanContent}
                      
                      {/* Render chart if present */}
                      {chartData && (
                        <ChatMessageChart 
                          chart={chartData} 
                          onAddToDashboard={handleAddToDashboard} 
                        />
                      )}
                      
                      {/* Render artifact link if present */}
                      {hasArtifact && message.role === 'assistant' && (
                        <div className="mt-4 border-t border-gray-700 pt-3">
                          <button
                            onClick={() => {
                              setCurrentArtifactId(artifactId);
                              setIsArtifactAutoOpened(false);
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
              <div ref={messagesEndRef} />
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
              onChange={handleInputChange}
              placeholder="Ask Marvin..."
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
      </div>

      {/* Artifact Drawer */}
      <ArtifactDrawer 
        isOpen={isArtifactModalOpen}
        onClose={() => setIsArtifactModalOpen(false)}
        artifactId={currentArtifactId}
        autoOpened={isArtifactAutoOpened}
      />
    </div>
  );
}
