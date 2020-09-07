import diagnosesData from '../../data/diagnoses.json';

import { DiagnoseEntry } from '../types';

const diagnoses: Array<DiagnoseEntry> = diagnosesData;

const getDiagnoses = (): Array<DiagnoseEntry> => {
    return diagnoses;
};

export default {
  getDiagnoses
};