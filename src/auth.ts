import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { User } from "./models/userModels";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const email = credentials.email as string | undefined;
                const password = credentials.password as string | undefined;
                if (!email || !password) throw new CredentialsSignin({
                    cause: "Please Provide Both Email And Password",
                });

                const user = await User.findOne({ email }).select("+password");
                if (password !== "passcode") throw new CredentialsSignin({
                    cause: "Password Does Not Match",
                });
                else return user;
            },
        })
    ]
}) 