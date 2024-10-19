import { NextRequest, NextResponse } from "next/server";
import { createMessage } from "./twillioService"; // Import from service

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { to, body: messageBody } = body;

  if (!to || !messageBody) {
    return NextResponse.json({ error: 'Missing "to" or "body" in request' }, { status: 400 });
  }

  try {
    const message = await createMessage(to, messageBody);
    return NextResponse.json({ success: true, message: message.body });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

  