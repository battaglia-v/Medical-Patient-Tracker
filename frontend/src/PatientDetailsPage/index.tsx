import React, { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Icon, Card } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";
import { toPatient } from "../utils";
import { InvalidPatientError } from "../helpers/errorHelper";

import EntryDetails from "../components/EntryDetails";

const genderIcons = {
    male: "mars" as "mars",
    female: "venus" as "venus",
    other: "genderless" as "genderless",
  };


const PatientDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    const fetchStatus = useRef({ shouldFetch: false, hasFetched: false });

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
    
      return (
          <>
          <Container>
            <h1>
             {patient.name} <Icon name={genderIcons[patient.gender]} />
            </h1>
             <div><em>SSN:</em> {patient.ssn}</div>
             <div><em>Occupation:</em> {patient.occupation}</div>
            
                <h3>
                    <em>Entries</em>
                </h3>
            
          <Card.Group>
            {patient.entries.map((entry) => (
              <EntryDetails key={entry.id} entry={entry} />
              ))}
          </Card.Group>
         </Container>
      </>
      );
    };

    export default PatientDetailsPage;