"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Update the schema to include new fields
export const FormSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required.",
    }),
    dateOfBirth: z.string().min(1, {
        message: "Date of birth is required.",
    }),
    phoneNumber: z.string().min(1, {
        message: "Phone number is required.",
    }),
    healthCardNumber: z.string().min(1, {
        message: "Health card number is required.",
    }),
});

interface FormProps {
    onSubmit: (data: z.infer<typeof FormSchema>) => void;
}

const FormContainer = ({ onSubmit }: FormProps) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            dateOfBirth: "",
            phoneNumber: "",
            healthCardNumber: "",
        },
    });

    


    return (
        <div className="form-itself">
            <div className="form-pre-text">
                <h1>Fill out this form!</h1>
                <p>
                    hi there, please start fill out the form, then chat with our bot, then submit it ✅
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    {/* Name Field */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Please enter your full name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Date of Birth Field */}
                    <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Please enter your date of birth.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Phone Number Field */}
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="(123) 456-7890" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Please enter your phone number.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Health Card Number Field */}
                    <FormField
                        control={form.control}
                        name="healthCardNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Health Card Number</FormLabel>
                                <FormControl>
                                    <Input placeholder="Health Card Number" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Please enter your health card number.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button type="submit" >
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default FormContainer;
