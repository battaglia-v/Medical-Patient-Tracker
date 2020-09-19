import React from "react";
import { HealthCheckEntry as Health } from "../types";

import { Card, Icon } from "semantic-ui-react";

import HealthRatingBar from "./HealthRatingBar";
import Diagnoses from "./Diagnoses";

const HealthCheckEntry: React.FC<{ patientEntry: Health }> = ({ patientEntry }) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {patientEntry.date} <Icon size="large" color="red" name="heartbeat" />
                </Card.Header>
                <Card.Meta> {patientEntry.specialist}</Card.Meta>
                <Card.Description>{patientEntry.description}</Card.Description>
                 {patientEntry.diagnosisCodes && (
                     <Diagnoses diagnosisCodes={patientEntry.diagnosisCodes} />
                 )}
            </Card.Content>
            <Card.Content extra>
                <HealthRatingBar rating={patientEntry.healthCheckRating} showText={true} />
            </Card.Content>
        </Card>
    );
;}

export default HealthCheckEntry;