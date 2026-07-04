import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("mw_session");

    return NextResponse.json({ success: true, message: "Logged out successfully." });
  } catch (err) {
    console.error("Logout API Error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

// Add GET handler as well for convenience redirection logout
export async function GET() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("mw_session");

    return NextResponse.redirect(new URL("/editor/login", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"));
  } catch (err) {
    console.error("Logout Redirect Error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
