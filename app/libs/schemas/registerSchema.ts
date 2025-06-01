import * as z from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" }),
  name: z
    .string()
    .min(2, { message: "Name is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one symbol",
    }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;