"use client";

import "../globals.css";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {useRouter} from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";



const formSchema = z.object({
    username: z.string().min(6),
    password: z.string().min(8),
});


const LoginPage = () => {

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });


    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        console.log("Form Data: ", data);

        router.push("/patient-dashboard")
    }

    return (
        <div className="form-auth">
            <div className="pre-form-text">
                <p>Welcome to health-bridge</p>
                <h1>Sign in</h1>
                <p>Not have an account with us? <a href="https://www.google.com/">Create one</a></p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="your username" type="username" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="your super secret password" type="password" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-2">
                        <Button type="submit" className="secondary-btn">
                            Submit
                        </Button>
                    </div>
                </form>

            </Form>

        </div>
    )
}


export default LoginPage;
