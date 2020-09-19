
import React from "react";
import { useStateValue } from "../state";

import * as yup from "yup";

import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { NewEntry } from "../types";

import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import EntryFields from "./EntryFields";

interface Props {
    initialValues: NewEntry;
    validationSchema: yup.ObjectSchema;
    onSubmit: (values: NewEntry) => void;
    onCancel: () => void;
  }

  const EntryForm: React.FC<Props> = ({
    onSubmit,
    onCancel,
    initialValues,
    validationSchema,
  }) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
            return (
              <Form className="form ui">
                <Field
                  label="Description"
                  placeholder="Description"
                  name="description"
                  component={TextField}
                />
                <Field
                  label="Date"
                  placeholder="YYYY-MM-DD"
                  name="date"
                  component={TextField}
                />
                <Field
                  label="Specialist"
                  placeholder="Specialist"
                  name="specialist"
                  component={TextField}
                />
                <DiagnosisSelection
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  diagnoses={Object.values(diagnoses)}
                />
                <EntryFields entryType={values.type} />
                <Grid>
                  <Grid.Column floated="left" width={5}>
                    <Button type="button" onClick={onCancel} color="red">
                      Cancel
                    </Button>
                  </Grid.Column>
                  <Grid.Column floated="right" width={5}>
                    <Button
                      type="submit"
                      floated="right"
                      color="green"
                      disabled={!dirty || !isValid}
                    >
                      Add
                    </Button>
                  </Grid.Column>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      );
    };
    
    export default EntryForm;