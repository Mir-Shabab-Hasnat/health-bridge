"use client"


import React from "react";

import { Button } from "../ui/button";
import { Bot } from "lucide-react";

const AIChatButton = ({ onClick }: { onClick: () => void }) => {
  

  const handleClick = () => {
    
    onClick();  // Call the external onClick function if needed
  };

  return (
    <>
      <Button onClick={handleClick} className="flex flex-col items-center w-full h-auto p-2 rounded-lg shadow-lg">
        <div className="flex items-center">
          <Bot size={20} className="mr-2" />
          <span className="whitespace-normal text-center">Tell us about your condition.</span>
        </div>
      </Button>

    </>
  );
};

export default AIChatButton;
