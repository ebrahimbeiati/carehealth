"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./PatientForm";
import { Doctors } from "@/constants";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import { createAppointment } from "@/lib/actions/appointment.actions";
import { getAppointmentSchema } from "@/lib/validation";


const AppointmentForm = ({ type, userId, patientId }: {
    userId: string;
    patientId: string;
    type: "create" | "cancel"| "schedule";

}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
    // 1. Define your form.
    const AppointmentFormValidation = getAppointmentSchema(type)
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
        primaryPhysician: "",
        schedule: new Date(),
        reason: "",
        note: "",
        cancellationReason: "",
    },
  });

  // 2. Define a submit handler.
//   async function onSubmit(
//  values:
//    z.infer<typeof AppointmentFormValidation>) {
//         setIsLoading(true);
//         let status;
//         switch (type) {
//             case "schedule":
//                 status = "scheduled";
//                 break;
//             case "cancel":
//                 status = "cancelled";
//                 break;
//             default:
//                 status = "pending";
//                 break;
//         }
//       console.log('befire', type)

//     try {
//         if (type === 'create' && patientId) {
//             const appointmentData = {
//                 userId,
//                 patient: patientId,
//                 primaryPhysician: values.primaryPhysician,
//                 schedule: new Date(values.schedule),
//                 status: status as Status,
//                 reason: values.reason!,
//                 note: values.note,
//             }

//             const appointment = await createAppointment(appointmentData);
//             console.log(appointment)
//             if (appointment) {
//                 form.reset();
//                 router.push(`/patients/${userId}/new-Appointment/success?appointmentId=${appointment.$id}`)
//             } 
//         }
//     } catch (error) {
//       console.error("Error creating user:", error); // Log detailed error information
//     }
//     setIsLoading(false);
//   }
    async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
      setIsLoading(true);

      let status;
      switch (type) {
        case "schedule":
          status = "scheduled";
          break;
        
        case "cancel":
          status = "cancelled";
          break;
        default:
          status = "pending";
          break;
      }

      console.log("Form values before API call:", values);

      try {
        if (type === "create" && patientId) {
          const appointmentData = {
            userId: userId,
            patient: patientId,
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule), 
            status: status as Status,
            reason: values.reason!,
            note: values.note,
          }

          const appointment = await createAppointment(appointmentData);
          console.log("Appointment response:", appointment);

          if (appointment) {
            form.reset();
            router.push(
              `/patients/${userId}/new-Appointment/success?appointmentId=${appointment.$id}`
            );
          }
        }
      } catch (error) {
        console.error("Error creating appointment:", error); // Log detailed error information
      }
      setIsLoading(false);
    }

    
    let buttonLabel;
    switch (type) {
        case "create":
          buttonLabel = "Create Appointment";
          break;
        case "cancel":
          buttonLabel = "Cancel Appointment";
            break;
        case "schedule":
            buttonLabel = "Schedule Appointment";
            break;
        default:
            break;
  
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment </h1>
          <p className="text-gray-300">
            Please fill out the form below to book an appointment.{" "}
          </p>
        </section>
        {type !== "cancel" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician" // Fix here
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={24}
                      height={24}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy -h:mm aa"
            />
            <div className="flex flex-col gap-5 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason for appointment"
                placeholder="Enter your reason for appointment"
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Additional notes"
                placeholder="Enter any additional notes"
              />
            </div>
          </>
        )}
        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Enter your reason for cancellation"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
