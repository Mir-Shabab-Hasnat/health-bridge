"use client";

import React, { useEffect, useRef, useState } from "react";
import { Message, useChat } from "ai/react";
import { cn } from "@/lib/utils";
import { Bot, Check, Trash, XCircle } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from 'zod';

import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}



const HealthcareResponseSchema = z.object({
  issue: z.string(),
  symptom: z.string(),
  medication: z.string(),
  others: z.string(),
  severity: z.number(),
});

const AIChatBox = ({ open, onClose }: AIChatBoxProps) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat(); // Assuming a hook for chat messages

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [submittedMessages, setSubmittedMessages] = useState<string>();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user";

  const handleCheckClick = async () => {
    const formattedMessages = messages
      .map((message) => {
        const prefix = message.role === "user" ? "Patient: " : "AI: ";
        return `${prefix}${message.content},`;
      })
      .join("\n");

    // Outputting the result to the console (you can change this as needed)
    console.log(formattedMessages);
    // Alternatively, you could set this formatted string to the component state to display it in the UI
    setSubmittedMessages(formattedMessages);
    // onClose()
    // setMessages([])

    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
    });
    
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: "You are a healthcare assistant that provides structured responses in JSON format. Please provide a healthcare assessment in the following structured format: Issue: (The primary health concern), symptom: (List the symptoms), Medication: (any medication the patient is using), Others: (Additional notes or observation), Severity: (a number between the range 1-99 that you will give by assessing the patient's situation)"
              },
              { role: "user", content: formattedMessages }
            ],
            response_format: zodResponseFormat(HealthcareResponseSchema, "event")
    })

    const event = completion.choices[0].message.parsed;

    console.log(event)

    // try {
    //   const response = await fetch("/api/health", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ messages: formattedMessages }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }

    //   const data = await response.json();
    //   console.log("API Response:", data); // Handle your API response as needed

    //   // You can process the response data here and display it or use it in your UI
    //   // For example:
    //   // setResponseData(data);
    // } catch (error) {
    //   console.error("Error calling OpenAI API:", error);
    // }
  };

  return (
    <div
      className={cn(
        "flex transition-all duration-300 ease-in-out mb-5", // Smoothly transition when opening
        open ? "block" : "hidden"
      )}
    >
      <button onClick={onClose} className="mb-1 ms-auto block">
        <XCircle size={30} />
      </button>
      <div className="flex h-[600px] w-auto sm:w-[500px] flex-col rounded bg-background border shadow-xl p-3">
        <div className="h-full mt-3 px-3 overflow-y-auto" ref={scrollRef}>
          {messages.map((message) => (
            <ChatMessage message={message} key={message.id} />
          ))}

          {isLoading && lastMessageIsUser && (
            <ChatMessage
              message={{
                role: "assistant",
                content: "Thinking...",
              }}
            />
          )}

          {error && (
            <ChatMessage
              message={{
                role: "assistant",
                content: "Something went wrong, please try again.",
              }}
            />
          )}

          {!error && messages.length === 0 && (
            <div className="flex h-full items-center justify-center gap-3">
              <Bot />
              Send a "Hi" to the chatbot to get started
            </div>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="m-3 flex flex-col sm:flex-row gap-1"
        >
          <Button
            title="Confirm"
            style={{ backgroundColor: "green", color: "white" }}
            size="icon"
            className="shrink-0"
            type="button"
            onClick={handleCheckClick}
          >
            <Check />
          </Button>
          <Button
            title="Clear chat"
            variant="outline"
            size="icon"
            className="shrink-0"
            type="button"
            onClick={() => setMessages([])}
          >
            <Trash />
          </Button>
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Say something..."
            ref={inputRef}
          />
          <Button type="submit" disabled={isLoading}>
            Send
          </Button>
        </form>
      </div>
      {submittedMessages}
    </div>
  );
};

export const ChatMessage = ({
  message: { role, content },
}: {
  message: Pick<Message, "role" | "content">;
}) => {
  const isAiMessage = role === "assistant";

  return (
    <div
      className={cn(
        "mb-3 flex items-center",
        isAiMessage ? "justify-start me-5" : "justify-end ms-5"
      )}
    >
      {isAiMessage && <Bot className="mr-2 shrink-0" />}
      <p
        className={cn(
          "whitespace-pre-line rounded-md border px-3 py-2",
          isAiMessage ? "bg-background" : "bg-primary text-primary-foreground"
        )}
      >
        {content}
      </p>
      {!isAiMessage && <div>:User</div>}
    </div>
  );
};

export default AIChatBox;
