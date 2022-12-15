import React from "react";
import { ListGroup, Modal, Button } from "react-bootstrap";
import EcoProxyCard from "../db/interfaces";
import * as Icon from "react-bootstrap-icons";
import { getCardsQuantityById } from "../utils";

interface FABCardManagerProps {
  cards: EcoProxyCard[];
  onAdd: (card: EcoProxyCard) => void;
  onRemove: (card: EcoProxyCard) => void;
  show: boolean;
  onHide: () => void;
  onRemoveAll: () => void;
}

export function ColorIcon({ pitch }: { pitch?: number }) {
  return (
    <>
      {pitch !== undefined && pitch === 1 && (
        <Icon.SquareFill size={13} style={{ marginRight: 5 }} color="red" />
      )}
      {pitch !== undefined && pitch === 2 && (
        <Icon.SquareFill size={13} style={{ marginRight: 5 }} color="yellow" />
      )}
      {pitch !== undefined && pitch === 3 && (
        <Icon.SquareFill size={13} style={{ marginRight: 5 }} color="blue" />
      )}
      {pitch === undefined ||
        (pitch === 0 && <Icon.Square size={13} style={{ marginRight: 5 }} />)}
    </>
  );
}

export default function FABCardManager(props: FABCardManagerProps) {
  const { cards, onAdd, onRemove, show, onHide, onRemoveAll } = props;

  const toRender = getCardsQuantityById(cards);
  return (
    <Modal
      show={show}
      onHide={() => onHide()}
      aria-labelledby="search-modal-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="search-modal-title">Manage</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup variant="flush">
          {Object.keys(toRender).map((cardId) => (
            <ListGroup.Item
              className="d-flex justify-content-between align-items-start"
              key={cardId}
            >
              <div className="ms-2 me-auto">
                <ColorIcon pitch={toRender[cardId].card.pitch} />
                {toRender[cardId].card.name}
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <Icon.DashCircleFill
                  color="#0d6efd"
                  size={15}
                  onClick={() => onRemove(toRender[cardId].card)}
                  style={{
                    marginRight: 5,
                    cursor: "pointer",
                  }}
                />
                {toRender[cardId].count}
                <Icon.PlusCircleFill
                  size={15}
                  color="#0d6efd"
                  onClick={() => {
                    if (toRender[cardId].count < 100)
                      onAdd(toRender[cardId].card);
                  }}
                  style={{
                    marginLeft: 5,
                    cursor:
                      toRender[cardId].count < 100 ? "pointer" : "not-allowed",
                  }}
                />
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={() => onRemoveAll()}>
          Remove all
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
