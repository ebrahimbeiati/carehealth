import { ID, Query } from "node-appwrite";
import { users } from "../appwrite.config";
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
