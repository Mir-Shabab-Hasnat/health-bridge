"use client";

import {useMutation} from "convex/react";
import {useEffect, useState} from "react";
import {z} from "zod";

import {api} from "@/convex/_generated/api";
import {Id} from "@/convex/_generated/dataModel";
import {useToast} from "@/hooks/use-toast";


import ChatContainer from "./ChatContainer";
import FormContainer, {FormSchema} from "./FormContainer";
import Nav from "./Nav"


// API response from ChatGPT analysis
interface ApiResponse {
    issue: string;
    symptoms: string;
    medication: string;
    other: string;
    severity: number;
}

const FormAndChat = () => {
    const {toast} = useToast();

    // Setup to grab the user's id from their cookies

    // Setup to store the ChatGPT response
    const [chatResponse, setChatResponse] = useState<ApiResponse | null>(null);

    // Setup the call to the Convex API to create an appointment in the system
    const createAppointment = useMutation(
        api.mutations.appointment.createAppointment
    );

    const [userId, setUserId] = useState<string | null>(null)

    useEffect(() => {
        async function fetchUserId() {
            const response = await fetch("/api/cookieUserId");
            const data = await response.json();
            setUserId(data.userId);
        }

        fetchUserId();
    }, []);

    // Handle a form being submitted
    function onSubmit(data: z.infer<typeof FormSchema>) {
        // Grab the username and display back in a toast
        const userName = data.name;
        toast({
            title: `Form submitted for ${userName}`,
        });

        console.log("hi");


        console.log(userId)
        // If the API from ChatGPT has a response AND the userId is in the
        // cookies, pass it to Convex
        if (chatResponse && userId) {
            createAppointment({
                issue: chatResponse.issue,
                medication: chatResponse.medication,
                others: "",
                severity: chatResponse.severity,
                symptoms: "",
                userId: userId as Id<"user">,
            });
        }
    }

    return (
        <div>
          <Nav />
            <main className="flex min-h-screen">
                <div className="form-container">
                    <FormContainer onSubmit={onSubmit}/>
                </div>

                <div className="chat-container">
                    <ChatContainer setChatResponse={setChatResponse}/>
                </div>
            </main>
        </div>
    );
};

export default FormAndChat;
