"use server";
import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";

export const loginHandler = async (email: string, password: string) => {
    if (!email || !password) throw new Error("Email and password are required");
    try {
        await signIn("credentials", {
            email,
            password,
            redirect: true,
            redirectTo: "/"
        })
    } catch (error) {
        const err = error as CredentialsSignin;
        return err.cause;
    }
}