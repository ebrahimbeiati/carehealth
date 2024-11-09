import * as sdk from "node-appwrite";

const client = new sdk.Client()
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)
  .setKey(process.env.NEXT_PUBLIC_API_KEY!);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
export const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;
export const patientCollectionId = process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID;
export const doctorCollectionId = process.env.DOCTOR_COLLECTION_ID;
export const appointmentCollectionId = process.env.APPOINTMENT_COLLECTION_ID;
export const bucketId = process.env.NEXT_PUBLIC_BUCKET_ID;
export const projectID = process.env.NEXT_PUBLIC_PROJECT_ID;
export const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;
export const apiKey = process.env.NEXT_PUBLIC_API_KEY;
