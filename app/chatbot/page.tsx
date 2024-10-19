"use client"

import AIChatBox from '@/components/Chatbot/AIChatBox'
import AIChatButton from '@/components/Chatbot/AIChatButton';
import React, { useState } from 'react'

const chatbot = () => {
    const [open, setOpen] = useState(false);
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      
      <AIChatButton onClick={() => setOpen(!open)} />
      {open && <AIChatBox open={open} onClose={() => setOpen(false)} />}
    </div>
  )
}

export default chatbot
