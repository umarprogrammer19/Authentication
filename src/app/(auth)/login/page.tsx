import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { toast } from "sonner";

export default function Login() {
    const loginHandler = async (formData: FormData) => {
        "use server";
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
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
            console.log(err.message);
        }
    }
    return (
        <div className="flex justify-center items-center h-dvh">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent >
                    <form action={async (formData) => {
                        const email = formData.get("email") as string | undefined;
                        const password = formData.get("password") as string | undefined;
                        if (!email || !password) toast.error("Email and password are required");
                        await loginHandler(formData)
                    }} className="flex flex-col gap-4">
                        <Input type="email" placeholder="Email" name="email" />
                        <Input type="password" placeholder="Password" name="password" />
                        <Button type="submit">Login</Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <Link href="/signup">Dont have an account? Sign Up</Link>
                </CardFooter>
            </Card>
        </div>
    );
};