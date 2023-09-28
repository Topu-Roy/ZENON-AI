import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma";

export default async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password)
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 500 }
    );
}
