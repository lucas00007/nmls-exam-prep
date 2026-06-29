import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/lib/db";
import { signToken } from "@/lib/auth";

function serializeError(error: unknown): string {
  if (error instanceof Error) {
    return JSON.stringify(error, Object.getOwnPropertyNames(error));
  }
  return String(error);
}

export async function POST(req: NextRequest) {
  // Step 1: parse request body
  let email: string;
  let password: string;
  try {
    const body = await req.json();
    email = body.email;
    password = body.password;
  } catch (error) {
    console.error("[login] step=parse_body", serializeError(error));
    return NextResponse.json(
      { error: "Login failed.", detail: "Failed to parse request body." },
      { status: 500 }
    );
  }

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  // Step 2: look up user (file DB → env var fallback)
  let user: Awaited<ReturnType<typeof getUserByEmail>>;
  try {
    user = getUserByEmail(email.trim().toLowerCase());
  } catch (error) {
    console.error("[login] step=getUserByEmail", serializeError(error));
    return NextResponse.json(
      { error: "Login failed.", detail: "User lookup failed." },
      { status: 500 }
    );
  }

  if (!user || !user.passwordHash) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 }
    );
  }

  // Step 3: verify password
  let valid: boolean;
  try {
    valid = await bcrypt.compare(password, user.passwordHash);
  } catch (error) {
    console.error("[login] step=bcrypt_compare", serializeError(error));
    return NextResponse.json(
      { error: "Login failed.", detail: "Password verification failed." },
      { status: 500 }
    );
  }

  if (!valid) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 }
    );
  }

  // Step 4: sign JWT
  let token: string;
  try {
    token = signToken({
      userId: user.id,
      email: user.email,
      plan: user.plan ?? (user.paid ? "paid" : "free"),
    });
  } catch (error) {
    console.error("[login] step=signToken", serializeError(error));
    return NextResponse.json(
      { error: "Login failed.", detail: "Token signing failed." },
      { status: 500 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return response;
}
