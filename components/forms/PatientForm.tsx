"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {Form} from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { userFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";


export enum FormFieldType{
  INPUT = "input",
  TEXTAREA = "textarea",
  CHECKBOX = "checkbox",
  PHONE_INPUT = "phoneInput",
  DATE_PICKER = "datePicker",
  SELECT = "select",
SKELETON = "skeleton",
}


const PatientForm = () => {
  const router  = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({name, email, phone}: z.infer<typeof userFormValidation>) {
    setIsLoading(true);
    try {
      // const userData = { name, email, phone };
      // const user = await createUser(userData);

      // if (user) router.push(`patients/${user.$id}/register`);
    } catch (error) {
      console.error(error);
    }
  }
   return (
     <Form {...form}>
       <form
         onSubmit={form.handleSubmit(onSubmit)}
         className="space-y-6 flex-1"
       >
         <section className="mb-12 space-y-4">
           <h1 className="header">Hi there 👋 </h1>
           <p className="text-gray-300">
             Please fill out the form below to get started.
           </p>
         </section>
         <CustomFormField
           fieldType={FormFieldType.INPUT}
           control={form.control}
           name="name" // Fix here
           label="Full name"
           placeholder="John Doe"
           iconSrc="/icons/user.svg"
           iconAlt="user"
         />
         <CustomFormField
           fieldType={FormFieldType.INPUT}
           control={form.control}
           name="email" // Fix here
           label="Email"
           placeholder="Enter your email"
           iconSrc="/icons/email.svg"
           iconAlt="mail"
         />
         <CustomFormField
           fieldType={FormFieldType.PHONE_INPUT}
           control={form.control}
           name="phone" // Fix here
           label="Phone number"
           placeholder="Enter your phone number"
         />
         <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
       </form>
     </Form>
   );
}

export default PatientForm;
