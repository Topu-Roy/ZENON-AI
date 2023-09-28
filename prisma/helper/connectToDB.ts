import prisma from "..";

export async function connectToDatabase() {
  try {
    await prisma.$connect();
  } catch (error) {
    console.log("Failed to connect to the database", error);
  }
}
