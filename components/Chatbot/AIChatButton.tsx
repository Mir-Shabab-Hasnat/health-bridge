"use client"


import React, { useState } from "react";
import AIChatBox from "./AIChatBox";
import { Button } from "../ui/button";
import { Bot } from "lucide-react";

const AIChatButton = () => {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setChatBoxOpen(true)}>
        <Bot size={20} className="mr-2"/>
        Tell us about your condition.
    </Button>
      <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </>
  );
};

export default AIChatButton;
