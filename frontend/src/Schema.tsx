import { EntryType, NewEntry } from "./types";
import * as yup from "yup";


export const options = [
    {
      key: EntryType.HealthCheck,
      value: EntryType.HealthCheck,
      text: "Health Check",
    },
    {
      key: EntryType.OccupationalHealthCare,
      value: EntryType.OccupationalHealthCare,
      text: "Occupational Health Care",
    },
    { key: EntryType.Hospital, value: EntryType.Hospital, text: "Hospital" },
  ];
  
  export const baseSchema = yup.object().shape({
    description: yup.string().min(12).required(),
    date: yup
      .string()
      .matches(/\w{4}-\w{2}-\w{2}/, "Enter date in the format YYYY-MM-DD")
      .required(),
    specialist: yup.string().min(6).required(),
  });
  
  const baseInitialValues = {
    description: "",
    date: "",
    specialist: "",
  };
  
  export const healthCheckInitialValues: NewEntry = {
    ...baseInitialValues,
    type: EntryType.HealthCheck,
    healthCheckRating: 0,
  };
  
  export const occupationalHealthCareIntitialValues: NewEntry = {
    ...baseInitialValues,
    type: EntryType.OccupationalHealthCare,
    employerName: "",
    sickLeave: { startDate: "", endDate: "" },
  };
  
  export const hospitalIntitialValues: NewEntry = {
    ...baseInitialValues,
    type: EntryType.Hospital,
    discharge: { date: "", criteria: "" },
  };