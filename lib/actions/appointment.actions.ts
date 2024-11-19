'use server'
import { ID, Query } from "node-appwrite"; // Adjust imports if needed
import { appointmentCollectionId, databases, databaseId } from "../appwrite.config";
import { parseStringify, formatDateTime } from "../utils";
import { Appointment } from "@/types/appwrite.types";
import { revalidatePath } from "next/cache";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      databaseId!,
      appointmentCollectionId!,
      ID.unique(),
      appointment
    );
    
console.log("New Appointment:", newAppointment);

    return parseStringify(newAppointment);
  } catch (error) {
    console.error("An error occurred while creating a new appointment:", error);
  }
}

export const getAppointment = async(appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      databaseId!,
      appointmentCollectionId!,
      appointmentId,
      
    );
    return parseStringify(appointment);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
}

export const getRecentAppointments = async () => {
  try {
    const appointments = await databases.listDocuments(
      databaseId!,
      appointmentCollectionId!,
      [Query.orderDesc('$createdAt')]
    );
    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    }
    const counts = (appointments.documents as Appointment[]).reduce((acc, appointment) => {
      if (appointment.status === 'scheduled') {
        acc.scheduledCount += 1;
      } else if (appointment.status === 'pending') {
        acc.pendingCount += 1;
      } else if (appointment.status === 'cancelled') {
        acc.cancelledCount += 1;
      }
      return acc;
    }, initialCounts);
    const data = {
      totalCount: appointments.total,
      ...counts,
      documents: appointments.documents,
    }
    return parseStringify(data);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
}

export const updateAppointment = async ({
  appointmentId,
  userId,
  timeZone,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    // Update appointment to scheduled -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#updateDocument
    const updatedAppointment = await databases.updateDocument(
      databaseId!,
      appointmentCollectionId!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) throw Error;

    // const smsMessage = `Greetings from CarePulse. ${
    //   type === "schedule"
    //     ? `Your appointment is confirmed for ${
    //         formatDateTime(appointment.schedule!, timeZone).dateTime
    //       } with Dr. ${appointment.primaryPhysician}`
    //     : `We regret to inform that your appointment for ${
    //         formatDateTime(appointment.schedule!, timeZone).dateTime
    //       } is cancelled. Reason:  ${appointment.cancellationReason}`
    // }.`;
    // await sendSMSNotification(userId, smsMessage);

    revalidatePath("/admin");
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.error("An error occurred while scheduling an appointment:", error);
  }
};

