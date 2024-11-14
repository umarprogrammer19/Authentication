import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login() {
    return (
        <div className="flex justify-center items-center h-dvh">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent >
                    <form className="flex flex-col gap-4">
                        <Input type="email" placeholder="Email" />
                        <Input type="password" placeholder="Password" />
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