import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import EcoProxyCard from "../db/interfaces";
import FABCardBasic from "./FABCardBasic";
import FABPrintCard from "./FABPrintCard";

interface FABCardProps {
  card: EcoProxyCard;
  removeCardToPrint?: (card: EcoProxyCard) => void;
  addCardToPrint: (card: EcoProxyCard) => void;
  fromSearch?: boolean;
  quantity?: number;
}

export default function FABCard(props: FABCardProps) {
  const { card, addCardToPrint, removeCardToPrint, fromSearch, quantity } =
    props;
  const editions = card.setIdentifiers.join(", ");
  const ellipsedEd =
    editions.length > 22 ? `${editions.substring(0, 22)}...` : editions;
  const ellipsedName =
    card.name.length > 22 && !fromSearch
      ? `${card.name.substring(0, 22)}...`
      : card.name;

  return (
    <Card className="fab-card">
      {!fromSearch && <FABPrintCard card={card} />}
      {fromSearch && <FABCardBasic card={card} />}
      <Card.Body className="card-info no-print" style={{ height: 102 }}>
        <Card.Title style={{ fontSize: "1rem" }}>{ellipsedName}</Card.Title>
        <Card.Text>{"(" + ellipsedEd + ")"}</Card.Text>
      </Card.Body>
      <Card.Footer className="no-print">
        <div className="d-flex justify-content-between align-items-center">
          {addCardToPrint && (
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => addCardToPrint(card)}
            >
              Add
            </Button>
          )}
          {fromSearch && quantity && (
            <Badge bg="success" style={{ fontSize: "0.8rem" }}>
              {quantity}
            </Badge>
          )}
          {removeCardToPrint && (
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => {
                if (removeCardToPrint) {
                  removeCardToPrint(card);
                }
              }}
            >
              Remove
            </Button>
          )}
        </div>
      </Card.Footer>
    </Card>
  );
}
