import { ID, Query } from "appwrite"; // Adjust imports if needed
import {
  BUCKET_ID,
  DATABASE_ID,
  NEXT_PUBLIC_ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { InputFile } from "node-appwrite";


import { parseStringify } from "../utils";

export const createUser = async (user: CreateUserParams) => {
  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newUser = await users.create(
      ID.unique(),
      user.email,
      undefined, // Consider passing `undefined` if phone number is optional
      user.name
    );

    console.log("User created successfully:", newUser); // Log successful user creation
    return parseStringify(newUser);
  } catch (error: any) {
    console.error("Error during user creation:", error.message, error.code); // Log detailed error

    // Check for existing user
    if (error && error.code === 409) {
      console.log(
        "User already exists, fetching existing user by email:",
        user.email
      );
      const document = await users.list([Query.equal("email", [user.email])]);

      if (document.users && document.users.length > 0) {
        console.log("Existing document found:", document.users[0]); // Log found document details
        return parseStringify(document.users[0]);
      } else {
        console.log("No existing document found with email:", user.email);
      }
    }

    // Log any other errors for troubleshooting
    console.error(
      "An error occurred while creating a new user:",
      error.message,
      error.code,
      error
    );
    throw error; // Re-throw to be handled by calling function
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};



export const registerPatient = async ({
  identificationDocument, ...patient}: RegisterUserParams) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      )

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
    }

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl:`${NEXT_PUBLIC_ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...patient
      }
    )

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};
