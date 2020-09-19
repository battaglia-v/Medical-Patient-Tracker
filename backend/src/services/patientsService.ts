/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import patients from '../../data/patients';

import { NonSensitivePatientEntry, NewPatient, Patient } from '../types';

const getPatients = (): NonSensitivePatientEntry[] => {
    console.log(patients);
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

console.log(getPatients);

const addEntry = ( patient: NewPatient): Patient => {
    const newPatient = {
        ...patient,
        id: 'd2773336-f723-11e9-8f0b-362b9e155667',
        entries: []
    };
    patients.push(newPatient);
    return newPatient;
    };

const findById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
    };

export default {
    getPatients,
    addEntry,
    findById
    };