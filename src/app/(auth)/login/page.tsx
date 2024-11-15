import { auth } from "@/auth";
import LoginForm from "@/components/client/form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await auth();
    if (session?.user) redirect("/");

    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <Card className="max-w-md w-full shadow-lg rounded-xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-semibold text-gray-900">Login</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <LoginForm />
                </CardContent>
                <CardFooter className="text-center">
                    <p className="text-md text-gray-600">
                        Don't have an account? 
                        <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500"> Sign Up</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
