"use client";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { loginHandler } from "@/actions/login";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();

    const handleSubmit = async (formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            toast.error("Email and password are required");
            return;
        }

        const toastId = toast.loading("Logging in...");
        try {
            const error = await loginHandler(email, password);

            if (!error) {
                toast.success("Login successful", { id: toastId });
                router.refresh();
            } else {
                toast.error(error, { id: toastId });
            }
        } catch (err) {
            console.error("Login error:", err);
            toast.error("Something went wrong. Please try again.", { id: toastId });
        }
    };

    return (
        <form
            action={(formData) => handleSubmit(formData)}
            className="flex flex-col gap-4"
        >
            <Input type="email" placeholder="Email" name="email" required />
            <Input type="password" placeholder="Password" name="password" required />
            <Button type="submit">Login</Button>
        </form>
    );
}
