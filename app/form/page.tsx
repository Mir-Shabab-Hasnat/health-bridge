"use client";

import FormContainer, { FormSchema } from "./FormContainer";
import ChatContainer from "./ChatContainer";
import { useState } from "react";
import {  useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
interface ApiResponse {
    issue: string;
    symptoms: string;
    medication: string;
    other: string;
    severity: number;
}



const FormAndChat = () => {
    const sendChatResponse = useMutation(api.mutations.triageIngestion.insertAppointment)
    const {toast} = useToast()

    function onSubmit(data: z.infer<typeof FormSchema>) {
        const userName = data.name;
        toast({
            title: `Form submitted for ${userName}`,

          })

        if (chatResponse) {
            sendChatResponse({
                
                issue: chatResponse.issue,
                medication: chatResponse.medication,
                symptoms: chatResponse.symptoms,
                others: chatResponse.other,
                severity: chatResponse.severity

            })
        }
    }

    const [chatResponse, setChatResponse] = useState<ApiResponse | null>(null)


    return (
        <main className="flex min-h-screen">
            <div className="form-container">
                <FormContainer onSubmit={onSubmit}/>

            </div>

            <div className="chat-container">
                <ChatContainer setChatResponse = {setChatResponse}/>
            </div>

        </main>
    );
}


export default FormAndChat;
