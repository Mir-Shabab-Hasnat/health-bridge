"use client";

import AIChatBox from "@/components/Chatbot/AIChatBox";
import AIChatButton from "@/components/Chatbot/AIChatButton";
import { useState } from "react";



const FormContainer = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex flex-col items-center bg-green-500 text-white p-4 min-h-screen">
            <div className='flex flex-col items-center justify-center w-full max-w-mdd'> {/* Add max width to center and contain the button */}
                <AIChatButton onClick={() => setOpen(!open)} />
                {open && <AIChatBox open={open} onClose={() => setOpen(false)} />}
            </div>
        </div>
    );
}

export default FormContainer;
