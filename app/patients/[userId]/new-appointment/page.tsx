import Image from "next/image";

import  AppointmentForm  from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";

const Appointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      {/* Otp verification*/}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w[860px] flex-1 justify-between">
          <Image
            src="/logo.png"
            alt="logo"
            width={496}
            height={496}
            className="mb-12 h-10 w-fit rounded"
          />
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />
          <p className="copyright py-12 mt-8">
            Care Health © All rights reserved.
          </p>
        </div>
      </section>
      <Image
        src="/appointment-img.png"
        alt="appointment"
        width={1000}
        height={1000}
        className="size-img max-w-[390px] bg-bottom bg-no-repeat bg-contain"
      />
    </div>
  );
};

export default Appointment;
