import { auth } from "@/auth";
import LoginForm from "@/components/client/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await auth();
    if (session?.user) redirect("/");
    return (
        <div className="flex justify-center items-center h-dvh">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent >
                    <LoginForm />
                </CardContent>
                <CardFooter>
                    <Link href="/signup">Dont have an account? Sign Up</Link>
                </CardFooter>
            </Card>
        </div>
    );
};