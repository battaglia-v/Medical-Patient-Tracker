import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Icon, Card, Button } from "semantic-ui-react";

import { Patient, NewEntry, EntryType } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";
import { toPatient } from "../utils";
import { InvalidPatientError } from "../helpers/errorHelper";

import EntryDetails from "../components/EntryDetails";
import EntryModal from "../PatientEntryForm";

const genderIcons = {
    male: "mars" as "mars",
    female: "venus" as "venus",
    other: "genderless" as "genderless",
  };


const PatientDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    const fetchStatus = useRef({ shouldFetch: false, hasFetched: false });

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const openModal = (): void => setModalOpen(true);

    let patient = { ...patients[id] };

    try {
        patient = toPatient(patient);
      } catch (e) {
        if (e instanceof InvalidPatientError && !fetchStatus.current.hasFetched) {
          fetchStatus.current = { ...fetchStatus.current, shouldFetch: true };
        } else {
          console.error(e);
        }
      }
    
      useEffect(() => {
        const fetchPatient = async () => {
          fetchStatus.current = { ...fetchStatus.current, shouldFetch: false };
          try {
            const { data: patient } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`
            );
            dispatch(setPatient(patient));
            fetchStatus.current = { ...fetchStatus.current, hasFetched: true };
          } catch (e) {
            console.error(e);
          }
        };
    
        if (fetchStatus.current.shouldFetch) {
          fetchPatient();
        }
      }, [id, dispatch]);

      const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
      };
    
      if (!patient) return null;
    
    
      const submitNewEntry = async (values: NewEntry) => {
        const body = { ...values };
    
        if (body.type === EntryType.OccupationalHealthCare) {
          if (!body.sickLeave?.endDate && !body.sickLeave?.startDate) {
            body.sickLeave = undefined;
          }
        }
    
        try {
          const { data: returnedPatient } = await axios.post<Patient>(
            `${apiBaseUrl}/patients/${patient.id}/entries`,
            body
          );
          dispatch(setPatient(returnedPatient));
          closeModal();
        } catch (e) {
          console.error(e.response?.data);
    
          let errorMessage = "Oops! Something went wrong!";
    
          if (e.response?.status >= 400 && e.response?.status < 500) {
            errorMessage = e.response.data.error;
          }
    
          setError(errorMessage);
        }
      };
    
      return (
          <>
          <Container>
            <h1>
             {patient.name} <Icon name={genderIcons[patient.gender]} />
            </h1>
             <div><em>SSN:</em> {patient.ssn}</div>
             <div><em>Occupation:</em> {patient.occupation}</div>
             <div><em>Date of Birth:</em> {patient.dateOfBirth}</div>
             <h3><em>Entries</em></h3>
             <Card.Group>
     
            {patient.entries.map((entry) => (
              <EntryDetails key={entry.id} entry={entry} />
              ))}
          </Card.Group>
          <br/>
             <EntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
              />
             <Button onClick={openModal}>Add New Entry</Button>
         </Container>
      </>
      );
    };

    export default PatientDetailsPage;