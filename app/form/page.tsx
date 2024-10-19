"use client";

import FormContainer from "./FormContainer";
import ChatContainer from "./ChatContainer";


const FormAndChat = () => {
    return(
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="grid grid-cols-2 gap-4 w-full max-w-6xl"> 
                <ChatContainer />
                <FormContainer />
            </div>
        </div>
    );
}


export default FormAndChat;
