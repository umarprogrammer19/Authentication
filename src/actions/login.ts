"use server";

import { signIn } from "@/auth";

export const loginHandler = async (email: string, password: string): Promise<string | void> => {
    if (!email || !password) {
        throw new Error("Both email and password are required.");
    }

    try {
        const response = await signIn("credentials", {
            email,
            password,
            redirect: true,
            redirectTo: "/",
        });

        if (!response) {
            throw new Error("Sign-in failed. Please try again.");
        }
        
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }
        console.error("Unexpected error during login:", error);
        throw new Error("An unexpected error occurred. Please try again later.");
    }
};
