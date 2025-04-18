"use client";

import { useState } from 'react';
import Image from 'next/image';

// Define connector types
interface Connector {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'ecommerce' | 'marketing' | 'analytics' | 'crm';
}

export default function ConnectorsPage() {
  const [connectors] = useState<Connector[]>([
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'Connect your Shopify store to import products, orders, and customers.',
      icon: '/icons/shopify.svg',
      category: 'ecommerce'
    },
    {
      id: 'facebook-ads',
      name: 'Facebook Ads',
      description: 'Import your ad campaigns, ad sets, and performance metrics.',
      icon: '/icons/facebook.svg',
      category: 'marketing'
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Connect to view website traffic, user behavior, and conversion data.',
      icon: '/icons/google-analytics.svg',
      category: 'analytics'
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Sync your email campaigns, subscribers, and engagement metrics.',
      icon: '/icons/mailchimp.svg',
      category: 'marketing'
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Connect your CRM to import leads, opportunities, and accounts.',
      icon: '/icons/salesforce.svg',
      category: 'crm'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Import payment data, subscriptions, and customer information.',
      icon: '/icons/stripe.svg',
      category: 'ecommerce'
    },
  ]);

  const handleConnect = (connectorId: string) => {
    console.log(`Connecting to ${connectorId}`);
    // Implementation for connection logic would go here
  };

  return (
    <div className="container mx-auto px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Connectors</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Connect your favorite platforms to import and analyze your data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {connectors.map((connector) => (
          <div 
            key={connector.id}
            className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md dark:hover:shadow-gray-800/50 flex flex-col"
          >
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-4 overflow-hidden flex-shrink-0">
                  {/* Fallback icon if image fails to load */}
                  <div className="text-gray-400 dark:text-gray-500 text-xl">
                    {connector.name.charAt(0)}
                  </div>
                  {/* Actual icon - hidden by default and shown when loaded */}
                  <div className="absolute">
                    <Image
                      src={connector.icon}
                      alt={connector.name}
                      width={32}
                      height={32}
                      className="opacity-0 transition-opacity duration-300"
                      onLoad={(e) => {
                        (e.target as HTMLImageElement).classList.remove('opacity-0');
                        (e.target as HTMLImageElement).classList.add('opacity-100');
                      }}
                      onError={(e) => {
                        // Keep fallback visible on error
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold truncate">{connector.name}</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">
                {connector.description}
              </p>
              
              <div className="mt-auto">
                <button
                  onClick={() => handleConnect(connector.id)}
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200 font-medium flex items-center justify-center"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 mr-2 flex-shrink-0" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 10V3L4 14h7v7l9-11h-7z" 
                    />
                  </svg>
                  <span>Connect</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
