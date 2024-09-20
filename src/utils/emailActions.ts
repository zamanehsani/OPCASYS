"use server";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "./prismaDB"; // Adjust the import according to your project structure

const resendAPIKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendAPIKey);

export const sendVerificationEmail = async (userEmail: string) => {
  // get the verification code from db with the email
  const rs = await prisma.verificationCode.findFirst({
    where: {
      email: userEmail,
    },
  });

  if (rs) {
    if (new Date(rs.expiresAt) < new Date()) {
      await prisma.verificationCode.delete({
        where: {
          id: rs.id,
        },
      });
    } else {
      return {
        status: 400,
        error: "Verification code is already sent",
      };
    }
  }

  const verificationCode = uuidv4();

  const sixDigitCode = verificationCode.slice(0, 6);

  // Store the verification code in the database or in-memory store
  await prisma.verificationCode.create({
    data: {
      email: userEmail,
      code: sixDigitCode,
      expiresAt: new Date(Date.now() + 3600 * 1000), // 1 hour expiration
    },
  });

  try {
    const data = await sendEmail(userEmail, sixDigitCode);
    console.log(data, "data ");
    return {
      status: 201,
      data,
    };
  } catch (error) {
    console.log(error, "error");
    return {
      status: 400,
      error,
    };
  }
};

const sendEmail = async (userEmail: string, code: string) => {
  return resend.emails.send({
    from: "OPCASYS <contact@timetally.info>",
    to: [userEmail],
    subject: "Verify your email",
    html: `<div>
     <p>Please copy the bellow code and past it in OPCASYS website. </p>
     <h1>${code}</h1>
    </div>`,
  });
};
