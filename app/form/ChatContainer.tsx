"use client";

import AIChatBox from "@/components/Chatbot/AIChatBox";
import AIChatButton from "@/components/Chatbot/AIChatButton";
import { useState } from "react";



const ChatContainer = () => {
    const [open, setOpen] = useState(false);
    const [apiResponse, setApiResponse] = useState(null)
    return (
        <div className="flex flex-col items-center justify-center bg-green-500 text-white p-4 h-auto">
            <div className='flex flex-col items-center justify-center w-full max-w-mdd'> {/* Add max width to center and contain the button */}
                <AIChatButton onClick={() => setOpen(!open)} />
                {open && (
                    <AIChatBox
                        open={open}
                        onClose={() => setOpen(false)}
                        setApiResponse={setApiResponse} />
                )}
            </div>
            {apiResponse && (
                <div className="bg-gray-900 p-3 rounded-md mt-4">
                    <h3 className="text-lg font-semibold mb-2">API Response:</h3>
                    <pre className="whitespace-pre-wrap break-words overflow-auto">
                        {JSON.stringify(apiResponse, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}

export default ChatContainer;
