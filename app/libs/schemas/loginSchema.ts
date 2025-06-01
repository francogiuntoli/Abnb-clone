import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one symbol",
    }),
});

export type LoginSchema = z.infer<typeof loginSchema>;