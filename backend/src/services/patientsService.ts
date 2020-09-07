import patients from '../../data/patients';

import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types';

const getPatients = (): Array<PatientEntry> => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        
    }));
};

const addEntry = ( entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: 'd2773336-f723-11e9-8f0b-362b9e155667',
        ...entry
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
   };

export default {
    getPatients,
    getNonSensitiveEntries,
    addEntry
};