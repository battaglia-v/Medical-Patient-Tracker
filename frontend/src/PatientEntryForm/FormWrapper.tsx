import React, { useState, useCallback } from "react";

import EntryForm from "./EntryForm";

import { options, healthCheckInitialValues, baseSchema, occupationalHealthCareIntitialValues, hospitalIntitialValues } from '../Schema';
import { Form, Dropdown, DropdownProps, Divider } from "semantic-ui-react";
import { EntryType, NewEntry  } from "../types";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const FormWrapper: React.FC<Props> = ({ onCancel, onSubmit }) => {
  const [entryType, setEntryType] = useState<EntryType>(EntryType.HealthCheck);

  const handleChange = (
    _e: React.SyntheticEvent,
    { value }: DropdownProps
  ): void => {
    if (value) setEntryType(value as EntryType);
  };

  const entryForm = useCallback(() => {
    switch (entryType) {
      case EntryType.HealthCheck:
        return (
          <EntryForm
            initialValues={healthCheckInitialValues}
            validationSchema={baseSchema}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        );
      case EntryType.OccupationalHealthCare:
        return (
          <EntryForm
            initialValues={occupationalHealthCareIntitialValues}
            validationSchema={baseSchema}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        );
      case EntryType.Hospital:
        return (
          <EntryForm
            initialValues={hospitalIntitialValues}
            validationSchema={baseSchema}
            onCancel={onCancel}
            onSubmit={onSubmit}
          />
        );
      default:
        return null;
    }
  }, [entryType, onCancel, onSubmit]);

  return (
    <>
      <Form>
        <Form.Field>
          <label>Entry Type</label>
          <Dropdown
            fluid
            onChange={handleChange}
            options={options}
            selection
            value={entryType}
          />
        </Form.Field>
      </Form>
      <Divider />
      {entryForm()}
    </>
  );
};

export default FormWrapper;