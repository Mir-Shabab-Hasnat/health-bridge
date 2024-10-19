"use client";

import FormContainer, { FormSchema } from "./FormContainer";
import ChatContainer from "./ChatContainer";
import { useState } from "react";
import {  useToast } from "@/hooks/use-toast";
import { z } from "zod";
interface ApiResponse {
    issue?: string;
    symptoms?: string;
    medication?: string;
    other?: string;
    severity: number;
}



const FormAndChat = () => {
    const {toast} = useToast()

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const userName = data.name;
        toast({
            title: `Form submitted for ${userName}`,
            
          })

        if (chatResponse) {
            console.log(chatResponse)
        }
    }
    const [chatResponse, setChatResponse] = useState<ApiResponse | null>(null)
    

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-6xl">
                <FormContainer onSubmit={onSubmit}/>
                <ChatContainer setChatResponse = {setChatResponse}/>

                
            </div>
            <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-md">
                    
                </div>
        </div>
    );
}


export default FormAndChat;
