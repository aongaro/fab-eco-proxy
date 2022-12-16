import React from "react";
import { Modal, ModalProps } from "react-bootstrap";
import EcoProxyCard from "../db/interfaces";
import FABCardSearch from "./FABCardSearch";

interface SearchModalProps extends ModalProps {
  addCardToPrint: (card: EcoProxyCard) => void;
  addedCards: EcoProxyCard[];
}

export default function SearchModal(props: SearchModalProps) {
  return (
    <Modal
      show={props.show}
      onHide={() => {
        if (props.onHide) props.onHide();
      }}
      dialogClassName="search-modal"
      aria-labelledby="search-modal-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="search-modal-title">Search For Cards</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FABCardSearch
          addCardToPrint={props.addCardToPrint}
          addedCards={props.addedCards}
        />
      </Modal.Body>
    </Modal>
  );
}
