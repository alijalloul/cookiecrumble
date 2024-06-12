import { Resend } from "resend";
import db from "@/db/db";
import { generateVerificationToken } from "@/lib/generateVerificationToken";

const resend = new Resend(process.env.RESEND_KEY);

export async function getVerificationTokenByToken(token: string) {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { token },
    });

    return verificationToken;
  } catch (error) {
    return { error: error };
  }
}

export async function getVerificationTokenByEmail(email: string) {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch (error) {
    return { error: error };
  }
}

export async function sendOTP(email: string, token: string) {
  const confirmLink = `http://localhost:3000/auth/new-verification?tokens=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email</p>`,
  });
}

export async function signUp(
  email: string,
  password: string,
  phonenumber: string
) {
  if (!email || !password || !phonenumber) {
    return {
      error: "Email, password, and phone number are required",
    };
  }

  try {
    // Check if the user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        error: "User with this email already exists.",
      };
    }

    // Hash the password
    const hashedPassword = Buffer.from(
      await crypto.subtle.digest("SHA-512", new TextEncoder().encode(password))
    ).toString("base64");

    // Create a new user
    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        phonenumber,
      },
    });

    const verificationToken = await generateVerificationToken(email);

    return { success: "Confirmation email sent" };
  } catch (error) {
    console.error(error);

    return {
      error: "Something went wrong while creating the user.",
    };
  }
}
