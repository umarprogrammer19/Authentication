import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async ({ email, password }) => {
                if (typeof email !== "string") throw new CredentialsSignin({
                    cause: "Email Do Not Match",
                });

                const user = { email, password };
                if (password !== "passcode") throw new CredentialsSignin({
                    cause: "Password Does Not Match",
                });
                else return user;
            },
        })
    ]
}) 