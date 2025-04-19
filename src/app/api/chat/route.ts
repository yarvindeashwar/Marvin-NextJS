import { Message } from 'ai';

// This is a mock function that simulates an AI response
// In a real app, this would call an actual AI service like OpenAI
async function mockAIResponse(messages: Message[]): Promise<Response> {
  // Get the last user message
  const lastMessage = messages[messages.length - 1];
  
  // Prepare responses based on user input
  let response = "I'm Marvin, your AI assistant. ";
  
  if (lastMessage.content.toLowerCase().includes('revenue')) {
    response += "Based on our data, revenue decreased by 12% last week compared to the previous week. The main factors were:\n\n" +
      "1. Seasonal fluctuation (accounts for ~60% of the drop)\n" +
      "2. Technical issues with the payment processor on Tuesday (accounts for ~30%)\n" +
      "3. Increased competition in the market (accounts for ~10%)\n\n" +
      "[CHART:Revenue Trend]\n\n" +
      "[ARTIFACT:revenue-analysis]\n\n" +
      "Would you like me to prepare a detailed report on this issue?";
  } else if (lastMessage.content.toLowerCase().includes('marketing') || 
             lastMessage.content.toLowerCase().includes('campaign')) {
    response += "The last marketing campaign performed 23% better than previous ones. Key metrics:\n\n" +
      "- Click-through rate: 4.2% (up from 3.1%)\n" +
      "- Conversion rate: 2.8% (up from 2.1%)\n" +
      "- ROI: 320% (up from 240%)\n\n" +
      "[CHART:Campaign Performance]\n\n" +
      "The improvements came primarily from better targeting and messaging refinement.";
  } else {
    response += "I can help you analyze your business data, create visualizations, and provide insights. " +
      "Ask me about revenue, marketing campaigns, user engagement, or any other business metrics you're interested in.";
  }
  
  // Create a stream formatted for Vercel AI SDK's data stream protocol
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // Split the response into words to simulate streaming text chunks
      const words = response.split(' ');
      for (const word of words) {
        // Format as Vercel AI SDK data stream text chunk: '0:"<chunk_text>"\n'
        // Note the JSON stringification of the word + space
        controller.enqueue(encoder.encode(`0:${JSON.stringify(word + ' ')}\n`));
        // Add a small delay to simulate network latency
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      controller.close();
    }
  });

  // Return a standard Response. The useChat hook expects this protocol by default.
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  });
}

export async function POST(req: Request) {
  try {
    // Extract the messages from the request
    const { messages } = await req.json();
    
    // Log the received messages for debugging
    console.log('API received messages:', messages);
    
    // Generate the AI response as a stream
    return await mockAIResponse(messages);
  } catch (error) {
    console.error('API route error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process chat request' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
