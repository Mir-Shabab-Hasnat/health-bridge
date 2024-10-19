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

export async function GET(request: Request) {
    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
      });

    const responseMessage = await openai.beta.chat.completions.parse({
        model: "gpt-4o-mini",
            messages: [
              {
                "role": "system",
                "content": "You are a healthcare assistant that provides structured responses in JSON format. The 'Severity' field must be based on the following criteria: 1-30: Mild symptoms that can be managed at home. 31-60: Moderate symptoms that may require over-the-counter treatment or a doctor's visit. 61-99: Severe symptoms that require immediate medical attention. Make sure the severity is based on the symptom duration, type, and intensity. Use all available patient information to assess severity. Format the response as follows: {issue: (The primary health concern), symptom: (List the symptoms), Medication: (any medication the patient is using), Others: (Additional notes or observation), Severity: (a number between 1-99)}"
              },
              { role: "user", content: "Patient: Hi, AI: Hello! How can I assist you today? What health issues are you currently facing?, Patient: I have a severe cold, AI: I'm sorry to hear that. How long have you been experiencing symptoms of your cold?, Patient: 1 week, AI: That sounds uncomfortable. Have you noticed any specific symptoms, such as a cough, sore throat, or fever?, Patient: i have a consistent cough, a sore arm, and headache, AI: Thank you for sharing that. On a scale of 1 to 10, how would you rate the severity of your cough and headache?, Patient: 5, AI: Got it. Have you tried any treatments or remedies to alleviate your symptoms, and if so, what have you tried?, Patient: no, AI: Understood. Have you experienced any other symptoms, such as fatigue, body aches, or nasal congestion?, Patient: yes, body aches, AI: Thank you for that information. Have you been in contact with anyone who has been sick recently?, Patient: nope, AI: Thank you for answering my questions. I'm done taking information now.," }
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