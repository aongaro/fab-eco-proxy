import React from "react";
import { ListGroup, Badge, Button, Row, Col } from "react-bootstrap";
import EcoProxyCard from "../db/interfaces";
import { ColorIcon } from "./FABCardManager";
import { Defense, Health, Intellect, Power, Cost, Pitch } from "./FABCardStats";

export interface FABCardsListItemProps {
  card: EcoProxyCard;
  addCardToPrint: (card: EcoProxyCard) => void;
  quantity?: number;
}

export default function FABCardsListItem({
  card,
  addCardToPrint,
  quantity,
}: FABCardsListItemProps) {
  const editions = card.setIdentifiers.join(", ");
  const ellipsedEd =
    editions.length > 22 ? `${editions.substring(0, 30)}...` : editions;
  return (
    <ListGroup.Item key={card.cardIdentifier}>
      <Row>
        <Col>
          <div className="d-flex align-items-center justify-content-start">
            <ColorIcon pitch={card.pitch} />{" "}
            <span className="fw-bold">{card.name} </span>
            <div className="mx-2 d-flex align-items-center justify-content-start">
              {card.power !== undefined && (
                <div style={{ marginRight: 6 }}>
                  <Power value={card.power} textRight={true} />
                </div>
              )}
              {card.intellect !== undefined && (
                <div style={{ marginRight: 6 }}>
                  <Intellect value={card.intellect} textRight={true} />
                </div>
              )}
              {card.defense !== undefined && (
                <div style={{ marginRight: 6 }}>
                  <Defense value={card.defense} textRight={true} />
                </div>
              )}
              {card.life !== undefined && (
                <div style={{ marginRight: 6 }}>
                  <Health value={card.life} textRight={true} />
                </div>
              )}
              {card.cost !== undefined && (
                <div style={{ marginRight: 6 }}>
                  <Cost value={card.cost} textRight={true} />
                </div>
              )}
              {card.pitch !== undefined && card.pitch > 0 && (
                <div style={{ marginRight: 6 }}>
                  <Pitch value={card.pitch} />
                </div>
              )}
            </div>
          </div>
          <Row>
            <Col>
              <small>({ellipsedEd})</small>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md className="d-flex justify-content-between">
              <div>
                <small>{card.typeText}</small>
              </div>
            </Col>
          </Row>
        </Col>
        <Col
          xs={12}
          lg="2"
          md="2"
          className="d-flex align-items-center justify-content-end"
        >
          {quantity && (
            <Badge bg="success" style={{ fontSize: "1rem", marginRight: 10 }}>
              {quantity}
            </Badge>
          )}
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => addCardToPrint(card)}
          >
            Add
          </Button>
        </Col>
      </Row>
      {/* <div className="ms-2 me-auto">
        <div className="fw-bold">
          <ColorIcon pitch={card.pitch} /> {card.name}
        </div>
        {card.typeText}
      </div>
      <div className="d-flex justify-content-between align-items-center">
        {quantity && (
          <Badge bg="success" style={{ fontSize: "1rem", marginRight: 10 }}>
            {quantity}
          </Badge>
        )}
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => addCardToPrint(card)}
        >
          Add
        </Button>
      </div> */}
    </ListGroup.Item>
  );
}
