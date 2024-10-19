"use server";

import { cookies } from "next/headers";

export async function getUserId() {
  const cookieStore = cookies();
  let userId = cookieStore.get("userId")?.value;

  if (typeof userId === "undefined") {
    userId = "";
  }

  return userId;
}
