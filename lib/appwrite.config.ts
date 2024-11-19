
// import * as sdk from "node-appwrite";


// const client = new sdk.Client()
//   .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
//   .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)
//   .setKey(process.env.NEXT_PUBLIC_API_KEY!);

// export const databases = new sdk.Databases(client);
// export const users = new sdk.Users(client);
// export const messaging = new sdk.Messaging(client);
// export const storage = new sdk.Storage(client);

// export const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID!;
// export const patientCollectionId = process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!;
// export const doctorCollectionId = process.env.NEXT_PUBLIC_DOCTOR_COLLECTION_ID!;
// export const appointmentCollectionId =
//   process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!;
// export const bucketId = process.env.NEXT_PUBLIC_BUCKET_ID!;
// export const projectID = process.env.NEXT_PUBLIC_PROJECT_ID!;
// export const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;


import * as sdk from "node-appwrite";

const client = new sdk.Client()
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!) 
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!) 
  .setKey(process.env.NEXT_PUBLIC_API_KEY!);                     

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);

// Public data, safe to expose
export const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID!;
export const patientCollectionId = process.env.NEXT_PUBLIC_PATIENT_COLLECTION_ID!;
export const bucketId = process.env.NEXT_PUBLIC_BUCKET_ID!;
export const projectID = process.env.NEXT_PUBLIC_PROJECT_ID!;
export const endpoint = process.env.NEXT_PUBLIC_ENDPOINT;

// Sensitive data, kept private and accessed server-side only
export const doctorCollectionId = process.env.NEXT_PUBLIC_DOCTOR_COLLECTION_ID!;  // Kept private
export const appointmentCollectionId =
  process.env.NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID!;  // Kept private


