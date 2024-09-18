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

    console.log(dbUser, "user");
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
