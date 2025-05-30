import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

export const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters long" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match"});

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" })
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters long" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match"
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, { message: "Current password must be at least 6 characters long" }),
  newPassword: z.string().min(6, { message: "New password must be at least 6 characters long" }),
  confirmNewPassword: z.string().min(6, { message: "Confirm new password must be at least 6 characters long" })
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "New passwords do not match"
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
