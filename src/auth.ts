import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { User } from "./models/userModels";
import { compare } from "bcryptjs";

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

                if (!user) throw new CredentialsSignin({
                    cause: "Invalid Email Or Password",
                });

                if (!user.password) throw new CredentialsSignin({
                    cause: "Invalid Email Or Password",
                });

                const isMatch = compare(password, user.password);

                if (!isMatch) throw new CredentialsSignin({
                    cause: "Invalid Email Or Password",
                });
                else return { name: user.name, email: user.email, id: user._id };

            },
        })
    ]
}) 