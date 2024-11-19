"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {Form} from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
 import { createUser } from "@/lib/actions/patient.actions";

 export enum FormFieldType {
   INPUT = "input",
   TEXTAREA = "textarea",
   CHECKBOX = "checkbox",
   PHONE_INPUT = "phoneInput",
   DATE_PICKER = "datePicker",
   SELECT = "select",
   SKELETON = "skeleton",
 }

 const PatientForm = () => {
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);
   // 1. Define your form.
   const form = useForm<z.infer<typeof UserFormValidation>>({
     resolver: zodResolver(UserFormValidation),
     defaultValues: {
       email: "",
     },
   });

   // 2. Define a submit handler.
   async function onSubmit({ email }: z.infer<typeof UserFormValidation>) {
     setIsLoading(true);

     try {
       const user = await createUser({ email });

       if (user) router.push(`/patients/${user.$id}/register`);
     } catch (error) {
       console.error("Error creating user:", error); // Log detailed error information
     }
     setIsLoading(false);
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
           name="email"
           label="Email"
           placeholder="Enter your email"
           iconSrc="/icons/email.svg"
           iconAlt="mail"
         />

         <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
       </form>
     </Form>
   );
 };

export default PatientForm;

