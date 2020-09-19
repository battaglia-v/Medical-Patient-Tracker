import React from 'react';

import { Card, Icon, List } from "semantic-ui-react";

import { OccupationalHealthCareEntry as Occupation } from "../types";

import Diagnoses from "./Diagnoses";

const OccupactionalHealthCareEntry: React.FC<{ work: Occupation }> = ({ work }) => {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>
                    {work.date} <Icon size="large" color="teal" name="briefcase" />
                </Card.Header>
                <Card.Meta>{work.specialist}</Card.Meta>
                <Card.Description>{work.description}</Card.Description>
                {work.diagnosisCodes && (
                    <Diagnoses diagnosisCodes={work.diagnosisCodes} />
                )}
                
                <List>
                {work.sickLeave && (
                    <Card.Description>
                        <b>Sick Leave</b> 
                    <Card.Meta>{work.sickLeave.startDate} ~ {work.sickLeave.endDate}</Card.Meta>
                    <Card.Meta>
                    {work.employerName}
                    </Card.Meta>
                    </Card.Description>
                )}
                </List>
            </Card.Content>
        </Card>
    );
};

export default OccupactionalHealthCareEntry;