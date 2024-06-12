import jwt from "jsonwebtoken";
import db from "@/db/db";
import { NextResponse } from "next/server";

const secret = process.env.JWT_SECRET as string;

export async function POST(req: any) {
  const { email, password, phonenumber } = await req.json();

  if (!email || !password || !phonenumber) {
    return NextResponse.json(
      { error: "Email, password, and phone number are required." },
      { status: 400 }
    );
  }

  try {
    // Check if the user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = Buffer.from(
      await crypto.subtle.digest("SHA-512", new TextEncoder().encode(password))
    ).toString("base64");

    // Create a new user
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        phonenumber,
      },
    });

    return NextResponse.json({ newUser }, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong while creating the user." },
      { status: 500 }
    );
  }
}
