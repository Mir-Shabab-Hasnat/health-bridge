import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const phoneNum = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !phoneNum) {
  throw new Error("Twilio credentials are not set in the environment variables.");
}

const client = twilio(accountSid, authToken);

export async function createMessage(to: string, body: string) {
  try {
    const message = await client.messages.create({
      body,
      from: phoneNum, // Your Twilio number
      to, // Recipient's phone number
    });

    console.log("Message sent:", message.body);
    return message;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error; // Re-throw the error to handle it elsewhere
  }
}