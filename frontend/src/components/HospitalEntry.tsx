import React from "react";

import { Card, Icon, List } from "semantic-ui-react";

import { HospitalEntry as Hospital } from "../types";

import Diagnoses from "./Diagnoses";

const HospitalEntry: React.FC<{ location: Hospital }> = ({ location }) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {location.date} <Icon size="large" color="red" name="hospital symbol" />
                </Card.Header>
                <Card.Meta>{location.specialist}</Card.Meta>
                <Card.Description>{location.description}</Card.Description>
                {location.diagnosisCodes && (
                    <Diagnoses diagnosisCodes={location.diagnosisCodes} />
                )}
            </Card.Content>

            <Card.Content extra>
                <List>
                    <List.Item>
                        <List.Header>Discharged: {location.discharge.date}</List.Header>
                        {location.discharge.criteria}
                    </List.Item>
                </List>
            </Card.Content>
        </Card>
    );
;}

export default HospitalEntry;