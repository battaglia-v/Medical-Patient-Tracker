export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
  }

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
  }
  

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  occupation: string;
  gender: Gender;
  ssn: string;
  
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;
