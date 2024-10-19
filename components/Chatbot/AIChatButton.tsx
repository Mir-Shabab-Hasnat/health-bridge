"use client"


import React, { useState } from "react";
import AIChatBox from "./AIChatBox";
import { Button } from "../ui/button";
import { Bot } from "lucide-react";

const AIChatButton = ({ onClick }: { onClick: () => void }) => {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  const handleClick = () => {
    setChatBoxOpen(true);
    onClick();  // Call the external onClick function if needed
  };

  return (
    <>
      <Button onClick={handleClick} className="flex flex-col items-center w-full h-auto p-2 bg-blue-500 text-white rounded-lg shadow-lg">
        <div className="flex items-center">
          <Bot size={20} className="mr-2" />
          <span className="whitespace-normal text-center">Tell us about your condition.</span>
        </div>
      </Button>

    </>
  );
};

export default AIChatButton;