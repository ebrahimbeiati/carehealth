// export const GenderOptions = ["male", "female", "other"];

// export const PatientFormDefaultValues = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   phone: "",
//   birthDate: new Date(Date.now()),
//   gender: "male" as Gender,
//   address: "",
//   occupation: "",
//   emergencyContactName: "",
//   emergencyContactNumber: "",
//   primaryPhysician: "",
//   insuranceProvider: "",
//   insurancePolicyNumber: "",
//   allergies: "",
//   currentMedication: "",
//   familyMedicalHistory: "",
//   pastMedicalHistory: "",
//   identificationType: "Birth Certificate",
//   identificationNumber: "",
//   identificationDocument: [],
//   treatmentConsent: false,
//   disclosureConsent: false,
//   privacyConsent: false,
// };

// export const IdentificationTypes = [
//   "Birth Certificate",
//   "Driver's License",
//   "Medical Insurance Card/Policy",
//   "Military ID Card",
//   "National Identity Card",
//   "Passport",
//   "Resident Alien Card (Green Card)",
//   "Social Security Card",
//   "State ID Card",
//   "Student ID Card",
//   "Voter ID Card",
// ];

// export const Doctors = [
//   {
//     image: "/images/dr-ebrahim.png",
//     name: "Ebrahim",
//   },
//   {
//     image: "/images/dr-cameron.png",
//     name: "Leila Cameron",
//   },
//   {
//     image: "/images/dr-livingston.png",
//     name: "David Livingston",
//   },
//   {
//     image: "/images/dr-peter.png",
//     name: "Evan Peter",
//   },
//   {
//     image: "/images/dr-farzaneh.png",
//     name: "Farzaneh Powell",
//   },
//   {
//     image: "/images/dr-remirez.png",
//     name: "Alex Ramirez",
//   },
//   {
//     image: "/images/dr-lee.png",
//     name: "Jasmine Lee",
//   },
//   {
//     image: "/images/dr-cruz.png",
//     name: "Alyana Cruz",
//   },
//   {
//     image: "/images/dr-sharma.png",
//     name: "Hardik Sharma",
//   },
// ];

// export const StatusIcon = {
//   scheduled: "/icons/check.svg",
//   pending: "/icons/pending.svg",
//   cancelled: "/icons/cancelled.svg",
// };
"use client";

import { useEffect, useState } from "react";

export const GenderOptions = ["male", "female", "other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: null as Date | null,  // Set birthDate to null initially
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: "/images/dr-ebrahim.png",
    name: "Ebrahim",
  },
  {
    image: "/images/dr-cameron.png",
    name: "Leila Cameron",
  },
  {
    image: "/images/dr-livingston.png",
    name: "David Livingston",
  },
  {
    image: "/images/dr-peter.png",
    name: "Evan Peter",
  },
  {
    image: "/images/dr-farzaneh.png",
    name: "Farzaneh Powell",
  },
  {
    image: "/images/dr-remirez.png",
    name: "Alex Ramirez",
  },
  {
    image: "/images/dr-lee.png",
    name: "Jasmine Lee",
  },
  {
    image: "/images/dr-cruz.png",
    name: "Alyana Cruz",
  },
  {
    image: "/images/dr-sharma.png",
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/icons/check.svg",
  pending: "/icons/pending.svg",
  cancelled: "/icons/cancelled.svg",
};

// Custom hook to handle dynamic default value for birthDate
export const usePatientFormDefaultValues = () => {
  const [patientFormValues, setPatientFormValues] = useState(PatientFormDefaultValues);

  useEffect(() => {
    // Handle client-side only date initialization (e.g., for birthDate)
    setPatientFormValues(prevValues => ({
      ...prevValues,
      birthDate: new Date(Date.now()),  // Set to current date or any value you want to initialize
    }));
  }, []);

  return patientFormValues;
};
