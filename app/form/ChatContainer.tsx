"use client";

import AIChatBox from "@/components/Chatbot/AIChatBox";
import AIChatButton from "@/components/Chatbot/AIChatButton";
import { useState } from "react";

interface ApiResponse {
    issue?: string;
    symptoms?: string;
    medication?: string;
    other?: string;
    severity: number;
}

interface ChatContainerProps {
    
    setChatResponse: (response: ApiResponse) => void
  }

const ChatContainer = ({setChatResponse}: ChatContainerProps) => {
    const [open, setOpen] = useState(false);
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null)
    
    if (apiResponse) {
        setChatResponse(apiResponse)
    }
    
    return (
        <div className="flex flex-col items-center justify-center bg-gray-500 rounded-lg p-4 h-auto">
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
                    <h3 className="text-lg font-semibold mb-2">Summary of Conversation:</h3>
                    <div className="mb-2">
                        <strong>Issue:</strong> {apiResponse.issue || "N/A"}
                    </div>
                    <div className="mb-2">
                        <strong>Symptoms:</strong> {apiResponse.symptoms || "N/A"}
                    </div>
                    <div className="mb-2">
                        <strong>Medication:</strong> {apiResponse.medication || "N/A"}
                    </div>
                    <div className="mb-2">
                        <strong>Other:</strong> {apiResponse.other || "N/A"}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ChatContainer;
