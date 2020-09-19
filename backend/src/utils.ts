/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from './types';

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};


const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect or missing 'name': ${name}`);
    }
    return name;
};

const parseSSN = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect or missing 'social security number': ${ssn}`);
    }
    return ssn;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Incorrect or missing 'occupation': ${occupation}`);
    }
    return occupation;
};

const parseBirthDate = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
        throw new Error(`Incorrect or missing 'Date of Birth': ${dateOfBirth}`);
    }
    return dateOfBirth;
};

// const isArrayOfEntries = (param: any[]): param is Entry[] => {
//     const hasInvalidEntry = param.some((entry) => {
//       return !Object.values(EntryType).includes(entry.type);
//     });
  
//     return !hasInvalidEntry;
//   };

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing 'gender': ${gender}`);
    }
    return gender;
};

// export const parseEntries = (entries: any): Entry[] => {
//     if (!entries || !Array.isArray(entries) || !isArrayOfEntries(entries)) {
//       throw new Error(`Incorrect or missing entries: ${JSON.stringify(entries)}`);
//     }
//     return entries;
//   };

export const toNewPatientEntry = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseBirthDate(object.dateOfBirth),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender),
        ssn: parseSSN(object.ssn),
    };
};


export default toNewPatientEntry;