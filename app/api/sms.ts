import twilio from "twilio"


const accountSid: string | undefined = process.env.TWILIO_ACCOUNT_SID

const authToken: string | undefined = process.env.TWILIO_AUTH_TOKEN

if (!accountSid || !authToken) {
    throw new Error("Twillio credentials are not set in the env")
}

const client = twilio(accountSid, authToken)

async function createMessage(): Promise<void> {
    try {
      const message = await client.messages.create({
        body: "This is the ship that made the Kessel Run in fourteen parsecs?",
        from: "+15017122661", // Replace with your Twilio number
        to: "+15558675310", // Replace with the recipient's phone number
      });
  
      console.log("Message sent:", message.body);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
  
  // Call the function to send the message
  createMessage();