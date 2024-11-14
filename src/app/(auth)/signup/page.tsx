import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignUp() {
    return (
        <div className="flex justify-center items-center h-dvh">
            <Card>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={async (formData: FormData) => {
                        const name = formData.get('name') as string | undefined;
                        const email = formData.get("email") as string | undefined;
                        const password = formData.get("password") as string | undefined;
                    }} className="flex flex-col gap-4">
                        <Input placeholder="Name" name="name" />
                        <Input type="email" placeholder="Email" name="email" />
                        <Input type="password" placeholder="Password" name="password" />
                        <Button type="submit">Sign Up</Button>
                    </form>
                </CardContent>
                <CardFooter>
                    <Link href="/login">Already have an account? Login</Link>
                </CardFooter>
            </Card>
        </div>
    );
};