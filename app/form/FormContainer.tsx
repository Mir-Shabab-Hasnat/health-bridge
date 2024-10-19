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

// Form validation schema
export const FormSchema = z.object({
    name: z.string().min(1, ),
    dateOfBirth: z.string().min(1, ),
    phoneNumber: z.string().min(1, ),
    healthCardNumber: z.string().min(1, ),
});

// interface FormProps {
//     onSubmit: (data: z.infer<typeof FormSchema>) => z.infer<typeof FormSchema>;
// }

const FormContainer = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            dateOfBirth: "",
            phoneNumber: "",
            healthCardNumber: "",
        },
    });

    const aiChatDone = false; // Set to true when AI chat is done

    const handleFormSubmit = (data: z.infer<typeof FormSchema>) => {
        console.log("Form submitted:", data);
        return data;
    };

    return (
        <div className="form-itself">
            <div className="form-pre-text">
                <h1>Fill out this form!</h1>
                <p>
                    hi there, please start fill out the form, then chat with our bot, then submit it ✅
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFormSubmit)} className="w-2/3 space-y-6">
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button type="submit" disabled={aiChatDone}>
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default FormContainer;
