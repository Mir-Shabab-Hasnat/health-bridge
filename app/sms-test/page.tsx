"use client"


import { useState } from 'react';

export default function SendSMS() {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<string | null>(null);

  const sendSMS = async () => {
    setStatus("Sending...");
    try {
      const res = await fetch("/api/sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: phoneNumber,
          body: message,
        }),
      });

      const result = await res.json();
      if (result.success) {
        setStatus('Message sent successfully!');
      } else {
        setStatus(`Error: ${result.error}`);
      }
    } catch (error) {
      console.log(error)
      setStatus('Failed to send message');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-medium text-black">Send a Text Message</h2>
      <input
        type="text"
        placeholder="Recipient's Phone Number"
        className="border p-2 w-full"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <textarea
        placeholder="Your Message"
        className="border p-2 w-full"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={sendSMS}
      >
        Send SMS
      </button>
      {status && <p className="mt-2 text-green-500">{status}</p>}
    </div>
  );
}