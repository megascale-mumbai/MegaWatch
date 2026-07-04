import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyPassword, encryptSession } from "@/lib/auth";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required." },
        { status: 400 }
      );
    }

    // Find the user in the database
    const user = await prisma.user.findUnique({
      where: { username: String(username).toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password." },
        { status: 401 }
      );
    }

    // Verify password
    const isValid = verifyPassword(password, user.salt, user.password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid username or password." },
        { status: 401 }
      );
    }

    // Encrypt session payload
    const token = encryptSession({
      userId: user.id,
      username: user.username,
      expiresAt: Date.now() + 60 * 60 * 24 * 1000, // 24 hours
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set({
      name: "mw_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
      sameSite: "lax",
    });

    return NextResponse.json({ success: true, username: user.username });
  } catch (err) {
    console.error("Login API Error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
