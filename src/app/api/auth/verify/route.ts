import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API);

export async function POST(req: any) {
  const { email } = await req.json();

  return NextResponse.json({ message: "Login successful" }, { status: 200 });
}
