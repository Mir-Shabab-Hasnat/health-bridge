import { openai } from "@ai-sdk/openai";
import { streamText, StreamData, CoreMessage, CoreAssistantMessage } from "ai";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const messages: CoreMessage[] = body.messages;

        // Initialize a counter to track the number of questions asked
        const questionCount = messages.filter(message => message.role === "user").length;

        // Add the system message to the beginning of the messages array
        const systemMessage: CoreAssistantMessage = {
            role: "assistant",
            content: `You are an intelligent healthcare assistant who will be asking patients about the health issues they are facing and asking them more questions along the way to learn more about what they are facing. You do not answer questions; you ask the user questions instead. After asking 6 questions, say that you are done taking information and refuse to reply.`
        };

        

        messages.unshift(systemMessage);

        // Create a new StreamData
        const data = new StreamData();
        data.append({ test: 'value' });  // You can customize this as needed

        // Call the language model
        const result = await streamText({
            model: openai('gpt-4o-mini'),
            onFinish() {
                data.close();
            },
            messages,
        });

        // After processing the result, check the number of user messages
        if (questionCount >= 6) {
            // Indicate to the assistant that it should stop asking questions
            messages.push({
                role: "assistant",
                content: "I have gathered enough information. If you have anything to add, please let me know. Otherwise, we can stop here."
            });
        }

        // Respond with the stream and additional StreamData
        return result.toDataStreamResponse({ data });

    } catch (error) {
        console.error(error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
