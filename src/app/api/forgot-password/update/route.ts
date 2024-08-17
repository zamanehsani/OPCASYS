import bcrypt from "bcrypt";
import { prisma } from "@/utils/prismaDB";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return new NextResponse("Internal Error");
}
