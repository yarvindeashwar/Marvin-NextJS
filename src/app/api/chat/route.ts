import { Message } from 'ai';

// Create a custom StreamingTextResponse class since we're not using OpenAI directly
class StreamingTextResponse extends Response {
  constructor(stream: ReadableStream) {
    super(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  }
}

// This is a mock function that simulates an AI response
// In a real app, this would call an actual AI service like OpenAI
async function mockAIStream(messages: Message[]): Promise<ReadableStream> {
  // Get the last user message
  const lastMessage = messages[messages.length - 1];
  
  // Prepare responses based on user input
  let response = "I'm Marvin, your AI assistant. ";
  
  if (lastMessage.content.toLowerCase().includes('revenue')) {
    response += "Based on our data, revenue decreased by 12% last week compared to the previous week. The main factors were:\n\n" +
      "1. Seasonal fluctuation (accounts for ~60% of the drop)\n" +
      "2. Technical issues with the payment processor on Tuesday (accounts for ~30%)\n" +
      "3. Increased competition in the market (accounts for ~10%)\n\n" +
      "[CHART]Revenue Trend[/CHART]\n\n" +
      "Would you like me to prepare a detailed report on this issue?";
  } else if (lastMessage.content.toLowerCase().includes('marketing') || 
             lastMessage.content.toLowerCase().includes('campaign')) {
    response += "The last marketing campaign performed 23% better than previous ones. Key metrics:\n\n" +
      "- Click-through rate: 4.2% (up from 3.1%)\n" +
      "- Conversion rate: 2.8% (up from 2.1%)\n" +
      "- ROI: 320% (up from 240%)\n\n" +
      "[CHART]Campaign Performance[/CHART]\n\n" +
      "The improvements came primarily from better targeting and messaging refinement.";
  } else {
    response += "I can help you analyze your business data, create visualizations, and provide insights. " +
      "Ask me about revenue, marketing campaigns, user engagement, or any other business metrics you're interested in.";
  }
  
  // Create a stream from the response text
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // Split the response into words and send them one by one with a delay
      // to simulate a streaming response
      const words = response.split(' ');
      
      for (const word of words) {
        controller.enqueue(encoder.encode(word + ' '));
        // Add a small delay to simulate streaming
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      controller.close();
    }
  });
  
  return stream;
}

export async function POST(req: Request) {
  // Extract the messages from the request
  const { messages } = await req.json();
  
  // Generate the AI response as a stream
  const stream = await mockAIStream(messages);
  
  // Return the stream as a streaming response
  return new StreamingTextResponse(stream);
}
