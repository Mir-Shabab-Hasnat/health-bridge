"use client";

import React, { useEffect, useRef, useState } from "react";
import { Message, useChat } from "ai/react";
import { cn } from "@/lib/utils";
import { Bot, Check, Trash, XCircle } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";




interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
  setApiResponse: (response: any) => void
}

const AIChatBox = ({ open, onClose, setApiResponse }: AIChatBoxProps) => {
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

    onClose()
    
    // setSubmittedMessages(formattedMessages);
    
    
    
    // sending request to analysis api to get analysis
    try {
        const response = await fetch("/api/analysis", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messages: formattedMessages
            }),
          });

          if (response.ok) {
            const jsonResponse = await response.json();

            setApiResponse(jsonResponse)
            console.log(jsonResponse)
          } else {
            console.log("Failed to fetch from API")
          }
    } catch (error) {
        console.log(error)
    }
    
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center w-full h-auto p-2 transition-all duration-300 ease-in-out mb-5", // Smoothly transition when opening
        open ? "block" : "hidden"
      )}
    >
      <button onClick={onClose} className="mb-1 ms-auto block">
        <XCircle size={30} />
      </button>
      <div className="flex h-[600px] w-auto  flex-col rounded bg-background border shadow-xl p-3">
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
              Send a &quot;Hi&quot; to the chatbot to get started
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

        <div className="flex flex-col mt-3 h-auto">
        
      </div>
      </div>
      
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
