import React from "react";
import { Modal, ModalProps } from "react-bootstrap";

export default function HelpModal(props: ModalProps) {
  return (
    <Modal
      show={props.show}
      onHide={() => {
        if (props.onHide) props.onHide();
      }}
      aria-labelledby="help-modal-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="help-modal-title">
          How to use FAB Eco Proxy
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Usage</h3>

        <ol>
          <li>Click "Add Cards"</li>
          <li>Enter card names in the search field</li>
          <li>Click "Add" on the cards you wish to print</li>
          <li>Exit the modal and eventually adjust card quantities</li>
          <li>
            Print using your browsers print fuctionality (landscape for US
            Letter, portrait for A4)
          </li>
        </ol>
        <h3>Feedback</h3>
        <p>
          If you have any feedback, please create a{" "}
          <a href="https://github.com/aongaro/fab-eco-proxy/issues">
            github issue
          </a>
          , and I will try to respond within a reasonable time.
        </p>
      </Modal.Body>
    </Modal>
  );
}
