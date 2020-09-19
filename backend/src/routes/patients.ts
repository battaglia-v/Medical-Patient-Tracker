/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry, { toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.json(patientsService.getPatients());
  });

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

router.get('/:id', (req, res) => {
  const patient = patientsService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post("/:id/entries", (req, res) => {
  const patient = patientsService.findById(req.params.id);

  if (patient) {
    try {
      const newEntry = toNewEntry(req.body);

      const updatedPatient = patientsService.addEntry(patient, newEntry);
      res.json(updatedPatient);

    } catch (e) {
      res.status(400).send(e.message);
    }
    } else {
      res.status(404).send("Not Found: Patient");
    }
});

export default router;