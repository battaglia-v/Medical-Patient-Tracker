import React from "react";

import { Entry, EntryType } from "../types";

import OccupationalHealthCareEntry from "./OccupationalHealthCareEntry";
import HospitalEntry from "./HospitalEntry";
import HealthCheckEntry from "./HealthCheckEntry";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case EntryType.Hospital:
            return <HospitalEntry location={entry} />;
        case EntryType.HealthCheck: 
            return <HealthCheckEntry patientEntry={entry} />;
        case EntryType.OccupationalHealthCare: 
            return <OccupationalHealthCareEntry work={entry} />;
        default:
            return null;
    }
};

export default EntryDetails;