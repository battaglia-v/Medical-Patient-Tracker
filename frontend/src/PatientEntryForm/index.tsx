import React from "react";
import FormWrapper from "./FormWrapper";

import { Modal, Segment } from "semantic-ui-react";
import { NewEntry } from "../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
}

const EntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`${error}`}</Segment>}
      <FormWrapper onCancel={onClose} onSubmit={onSubmit} />
    </Modal.Content>
  </Modal>
);

export default EntryModal;
