
import { z } from "zod";

export const paymentSchema = z.object({
  amount: z.coerce.number().min(1, "Donation amount must be at least 1"),
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  isAnonymous: z.boolean().default(false),
  isRecurring: z.boolean().default(false),
  recurringPeriod: z.enum(["monthly", "quarterly", "annually"]).optional(),
  message: z.string().optional(),
});

export type FormData = z.infer<typeof paymentSchema>;
