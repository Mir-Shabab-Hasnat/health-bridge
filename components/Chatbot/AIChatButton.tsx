"use client"


import React, { useState } from "react";
import AIChatBox from "./AIChatBox";
import { Button } from "../ui/button";
import { Bot } from "lucide-react";

const AIChatButton = ({onClick} : {onClick: () => void}) => {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  const handleClick = () => {
    setChatBoxOpen(true);
    onClick();  // Call the external onClick function if needed
  };

  return (
    <>
      <Button onClick={handleClick}>
        <Bot size={20} className="mr-2"/>
        Tell us about your condition.
    </Button>
      
    </>
  );
};

export default AIChatButton;