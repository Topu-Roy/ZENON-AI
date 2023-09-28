import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import { connectToDatabase } from "../../../../prisma/helper/connectToDB";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password)
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 500 }
    );

  try {
    await connectToDatabase();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    return NextResponse.json(user, { status: 202 });
  } catch {
    return NextResponse.json(
      { error: "Could not create a user" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
