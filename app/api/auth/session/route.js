import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptSession } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("mw_session");

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ authenticated: false, message: "No active session." });
    }

    const session = decryptSession(sessionCookie.value);

    if (!session || Date.now() > session.expiresAt) {
      return NextResponse.json({ authenticated: false, message: "Session expired or invalid." });
    }

    return NextResponse.json({
      authenticated: true,
      userId: session.userId,
      username: session.username,
    });
  } catch (err) {
    console.error("Session API Error:", err);
    return NextResponse.json(
      { authenticated: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
