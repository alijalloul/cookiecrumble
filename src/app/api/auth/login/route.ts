import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { signIn } from "@/auth";
import { defaultLoginRedirect } from "@/routes";
import { AuthError } from "next-auth";

const prisma = new PrismaClient();

export async function POST(req: any) {
  const { phonenumber, password } = await req.json();

  if (!phonenumber || !password) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findFirst({
      where: { phonenumber },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isMatch =
      Buffer.from(
        await crypto.subtle.digest(
          "SHA-512",
          new TextEncoder().encode(password)
        )
      ).toString("base64") === user.password;

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    try {
      await signIn("credentials", {
        phonenumber,
        password,
        redirectTo: defaultLoginRedirect,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid credentials!" };
          default:
            return { error: "Something went wrong!" };
        }
      }

      throw error;
    }

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong while creating the user." },
      { status: 500 }
    );
  }
}
