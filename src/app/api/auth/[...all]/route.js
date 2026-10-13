import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Handles every /api/auth/... request (sign up, sign in, sign out, ...)
export const { GET, POST } = toNextJsHandler(auth);
