import { auth } from "@/config/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { z } from "zod";

export const LoginServices = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  try {
    loginSchema.parse({ email, password });

    const result = await signInWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw error.errors.map((e) => e.message).join("\n");
    } else {
      throw "Invalid email or password";
    }
  }
};

export const RegisterServices = async ({
  email,
  password,
  confirmPassword,
}: {
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  if (password !== confirmPassword) {
    throw "Password and confirm password do not match";
  }

  const registerSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  try {
    // Validasi input menggunakan skema gabungan
    registerSchema.parse({ email, password });

    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw error.errors.map((e) => e.message).join("\n");
    } else {
      throw "Invalid register to Travee";
    }
  }
};
