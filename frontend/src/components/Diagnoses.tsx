import React from "react";
import { useStateValue } from "../state";

import { DiagnosisProps } from "../types";
import { List } from "semantic-ui-react"

const Diagnoses: React.FC<DiagnosisProps> = ({ diagnosisCodes }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <List>
            <List.Item>
                <List.Header>
                 {diagnosisCodes.length > 1 ? "Diagnoses" : "Diagnosis"}
                </List.Header>
            </List.Item>
            {diagnosisCodes.map((code) => (
                <List.Item key={code}>
                    <List.Content>
                        <List.Description>
                             {diagnoses[code] && diagnoses[code].name}
                        </List.Description>
                    </List.Content>
                </List.Item>
            ))}
        </List>
    )



}

export default Diagnoses;