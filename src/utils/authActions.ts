"use server";
import bcrypt from "bcrypt";
import { z } from "zod";

import { signUpSchema } from "./authValidations";
import { prisma as db } from "./prismaDB";
type SignUpData = z.infer<typeof signUpSchema>;

export const registerUser = async (data: SignUpData) => {
  try {
    const body = signUpSchema.parse(data);
    const hashPassword = await bcrypt.hash(body.password, 12);

    const dbUser = await db.user.findFirst({
      where: {
        email: data.email as string,
      },
      select: {
        id: true,
      },
    });

    if (dbUser?.id) {
      return {
        body: JSON.stringify({
          message: "User already exists",
        }),
        status: 400,
      };
    }

    const user = await db.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashPassword,
        lastName: body.lastName,
        phone: body.phone,
      },
    });

    return {
      body: JSON.stringify({
        message: "User registered successfully",
        user,
      }),
      status: 201,
    };
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return {
        body: JSON.stringify({
          message: error.errors[0].message,
        }),
        status: 400,
      };
    }
    return {
      body: JSON.stringify({
        message: "Something went wrong",
      }),
      status: 500,
    };
  }
};

export const verifyEmailCode = async (userEmail: string, code: string) => {
  try {
    const verificationRecord = await db.verificationCode.findFirst({
      where: {
        email: userEmail,
      },
    });

    if (
      !verificationRecord ||
      verificationRecord.code !== code ||
      verificationRecord.expiresAt < new Date()
    ) {
      return {
        status: 400,
        error: "Invalid verification code or expired",
      };
    }

    // Update user's emailVerified field
    const userUpdate = await db.user.update({
      where: { email: userEmail },
      data: { emailVerified: new Date() },
    });

    // Optionally, delete the verification record
    const del = await db.verificationCode.delete({
      where: { id: verificationRecord.id },
    });

    console.log({
      userUpdate,
      del,
    });

    return {
      status: 200,
      message: "Email verified successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      error: "Something went wrong",
    };
  }
};
