/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import patients from '../../data/patients';

import { NonSensitivePatientEntry, NewPatient, Patient, Entry, NewEntry } from '../types';
import { v4 as uuid } from 'uuid';

let allPatients = [...patients];

const findById = (id: string): Patient | undefined => {
    const patient = allPatients.find(p => p.id === id);
    return patient;
    };

const getPatients = (): NonSensitivePatientEntry[] => {
  
    return allPatients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

console.log(getPatients);

const addPatient = ( patient: NewPatient): Patient => {
    const newPatient = {
        ...patient,
        id: uuid(),
        entries: [] as Entry[]
    };
    allPatients = allPatients.concat(newPatient);
    return newPatient;
    };

const addEntry = (patient: Patient, newEntry: NewEntry): Patient => {
    const entry:Entry = {...newEntry, id: uuid() };
        const savedPatient = {...patient, entries: patient.entries.concat(entry) };
        allPatients = allPatients.map((p) => (p.id === savedPatient.id ? savedPatient : p));

        return savedPatient;
};





export default {
    getPatients,
    addEntry,
    findById,
    addPatient
    };