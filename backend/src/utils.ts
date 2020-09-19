/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, EntryType, HealthCheckRating, SickLeave, Discharge, NewBaseEntry, NewEntry, Diagnosis  } from './types';

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

  const isHealthCheckRating = (param: any): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
  };

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect or missing 'gender': ${gender}`);
    }
    return gender;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

  const parseToDate = (param: any, paramName: string): string => {
        if (!param || !isString(param) || !isDate(param)) {
            throw new Error (`Incorrect or missing ${paramName}: ${param}`);
        }
    return param;
};

export const parseToString = (param: any, paramName: string): string => {
    if (!param || !isString(param)) {
      throw new Error(`Incorrect or missing ${paramName}: ${param}`);
    }
    return param;
  };

  const parseEntryType = (entryType: any): EntryType => {
    if (!Object.values(EntryType).includes(entryType)) {
      throw new Error(`Incorrect or missing type: ${entryType}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entryType;
  };

  const parseDiagnosesCodes = (diagnosisCodes: any): Array<Diagnosis["code"]> => {
      if (!diagnosisCodes) {
          throw new Error (
              `Incorrect or missing diagnosis codes: ${JSON.stringify(diagnosisCodes)}`
              );
            }
            return diagnosisCodes;
          };

export const toNewPatientEntry = (object: any): NewPatient => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseToDate(object.dateOfBirth, "dateOfBirth"),
        occupation: parseOccupation(object.occupation),
        gender: parseGender(object.gender),
        ssn: parseSSN(object.ssn),
    };
};

const toNewBaseEntry = (object: any): NewBaseEntry => {
    const newBaseEntry: NewBaseEntry = {
      type: parseEntryType(object.type),
      description: parseToString(object.description, "description"),
      date: parseToDate(object.date, "date"),
      specialist: parseToString(object.specialist, "specialist"),
    };
  
    if (object.diagnosisCodes) {
      newBaseEntry.diagnosisCodes = parseDiagnosesCodes(object.diagnosisCodes);
    }
  
    return newBaseEntry;
  };
  
  const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
    if (
      healthCheckRating === null || healthCheckRating === undefined || !isHealthCheckRating(healthCheckRating)
    ) {
      throw new Error(
        `Incorrect or missing healthCheckRating: ${healthCheckRating}`
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return healthCheckRating;
  };
  
  const parseSickLeave = (object: any): SickLeave => {
    if (!object) throw new Error(`Incorrect or missing sickLeave: ${object}`);
  
    return {
      startDate: parseToDate(object.startDate, "sickLeave['startDate']"),
      endDate: parseToDate(object.endDate, "sickLeave['endDate']"),
    };
  };
  
  const parseDischarge = (object: any): Discharge => {
    if (!object) throw new Error(`Incorrect or missing discharge: ${object}`);
  
    return {
      date: parseToDate(object.date, `discharge["date"]`),
      criteria: parseToString(object.criteria, `discharge["criteria"]`),
    };
  };

  
  export const toNewEntry = (object: any): NewEntry => {
    const newBaseEntry = toNewBaseEntry(object) as NewEntry;
  
    switch (newBaseEntry.type) {
      case EntryType.HealthCheck:
        return {
          ...newBaseEntry,
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };
      case EntryType.OccupationalHealthCare:
        const newEntry = {
          ...newBaseEntry,
          employerName: parseToString(object.employerName, "employerName"),
        };
  
        if (object.sickLeave) {
          newEntry.sickLeave = parseSickLeave(object.sickLeave);
        }
  
        return newEntry;
      case EntryType.Hospital:
        return { ...newBaseEntry, discharge: parseDischarge(object.discharge) };
      default:
        return newBaseEntry;
    }
  };


export default toNewPatientEntry;