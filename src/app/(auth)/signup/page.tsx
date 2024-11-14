import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User } from "@/models/userModels";
import { hash } from "bcryptjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function SignUp() {
    const signUp = async (formData: FormData) => {
        "use server";
        const name = formData.get('name') as string | undefined;
        const email = formData.get("email") as string | undefined;
        const password = formData.get("password") as string | undefined;

        if (!name || !email || !password) {
            throw new Error("Please fill in all fields");
        }
        const user = await User.findOne({ email });
        if (user) {
            throw new Error("Email already in use");
        }
        const hashPassword = await hash(password, 10);
        await User.create({
            name,
            email,
            password: hashPassword,
        });
        redirect("/login");
    }
    return (
        <div className="flex justify-center items-center h-dvh">
            <Card>
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={signUp} className="flex flex-col gap-4">
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