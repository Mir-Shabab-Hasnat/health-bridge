import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { z } from 'zod';

const HealthcareResponseSchema = z.object({
    issue: z.string(),
    symptom: z.string(),
    medication: z.string(),
    others: z.string(),
    severity: z.number(),
  });

export async function POST(request: Request) {
    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
      });

    const {messages} = await request.json()

    const responseMessage = await openai.beta.chat.completions.parse({
        model: "gpt-4o-mini",
            messages: [
              {
                "role": "system",
                "content": "You are a healthcare assistant that provides structured responses in JSON format. The 'Severity' field must be based on the following criteria: 1-30: Mild symptoms that can be managed at home. 31-60: Moderate symptoms that may require over-the-counter treatment or a doctor's visit. 61-99: Severe symptoms that require immediate medical attention. Make sure the severity is based on the symptom duration, type, and intensity. Use all available patient information to assess severity. Format the response as follows: {issue: (The primary health concern), symptom: (List the symptoms), Medication: (any medication the patient is using), Others: (Additional notes or observation), Severity: (a number between 1-99)}"
              },
              { role: "user", content: messages }
            ],
            response_format: zodResponseFormat(HealthcareResponseSchema, "event")
    })

    const response = responseMessage.choices[0].message.parsed;
  
    // Return the response with status 200 and content type JSON
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }