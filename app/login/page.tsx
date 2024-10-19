"use client";

import "../globals.css";
import * as z from "zod";
import {Button} from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {useRouter} from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";



const formSchema = z.object({
    email: z.string().email().min(6),
    password: z.string().min(8),
});


const LoginPage = () => {

    //const router = useRouter()

    console.log("LoginPage@!!@!!@E#@!");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });


    // const handleSubmit = (data: z.infer<typeof formSchema>) => {
    //     console.log("Form Data: ", data);

    // }
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    const authenticate = useMutation(api.mutations.userAuthentication.authenticate);
    console.log("authenticateewfdwedfcws");
  
    const handleSubmit = async (data : z.infer<typeof formSchema>) => {
      try {
        console.log("Form Data: ", data);
        console.log(data)
        const result: boolean | (string | boolean)[] = await authenticate({ username: data.email, password: data.password });
  
        if (Array.isArray(result)) {
            console.log("result", result)
          const [userId, isDoctor] = result;
  
          if (typeof userId === 'string') {
            document.cookie = `userId=${userId}; path=/`;
          }
  
          if (typeof isDoctor === 'boolean') {
            document.cookie = `isDoctor=${isDoctor}; path=/`;
          }
  
        } else if (typeof result === 'boolean') {
          document.cookie = `loginSuccess=${result}; path=/`;
        }
  
        alert('User registered successfully!');
      } catch (error) {
        console.error(error);
        alert('Error registering user: ' + error)
      }
    };

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
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="your email" type="email" {...field} />
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
