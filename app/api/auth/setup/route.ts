import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserByToken, updateUserPassword } from "@/lib/db";
import { signToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 }
      );
    }

    const user = getUserByToken(token);

    if (!user) {
      return NextResponse.json(
        { error: "This link is invalid or has already been used." },
        { status: 400 }
      );
    }

    if (user.setupTokenExpiry && Date.now() > user.setupTokenExpiry) {
      return NextResponse.json(
        { error: "This link has expired. Please contact support." },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    updateUserPassword(user.id, passwordHash);

    const jwtToken = signToken({ userId: user.id, email: user.email });

    const response = NextResponse.json({ success: true });
    response.cookies.set("auth_token", jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Setup error:", error);
    return NextResponse.json(
      { error: "Account setup failed." },
      { status: 500 }
    );
  }
}
