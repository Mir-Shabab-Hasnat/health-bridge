"use client";

import FormContainer from "./FormContainer";
import ChatContainer from "./ChatContainer";


const FormAndChat = () => {
    return(
        <div>
            <div className="form-container">
                <FormContainer />
            </div>


            <div className="chat-container">
                <ChatContainer />
            </div>
        </div>
    );
}


export default FormAndChat;
