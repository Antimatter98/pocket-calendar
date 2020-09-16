import React from "react";
import { Modal, ModalHeader } from "shards-react";

export const SavingModal = ({ open, toggle }) => {
  return (
    <Modal open={open} toggle={toggle}>
      <ModalHeader>
        Your preferences are being saved...{" "}
        <span role="img" aria-label="sandtimer">
          ⌛
        </span>
      </ModalHeader>
    </Modal>
  );
};

export const SavedModal = ({ prefSaved, resetModal }) => {
  return (
    <Modal open={prefSaved} toggle={resetModal}>
      <ModalHeader>
        Your preferences have been saved successfully!{" "}
        <span role="img" aria-label="rocket">
          🚀
        </span>
      </ModalHeader>
    </Modal>
  );
};
