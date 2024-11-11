// 'use server'
import { ID } from "node-appwrite"; // Adjust imports if needed
import { appointmentCollectionId, databases, databaseId } from "../appwrite.config";
import { parseStringify } from "../utils";

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

