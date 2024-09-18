import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Your email is invalid." }),
  password: z.string().min(4),
});

export const signUpSchema = z.object({
  name: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email({ message: "Your email is invalid." }),
  password: z.string(),
});
