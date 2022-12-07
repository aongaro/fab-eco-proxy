import React from "react";
import { Button, Card } from "react-bootstrap";
import "./App.css";
import Atk from "./atk.png";
import Def from "./def.png";
import Life from "./life.png";
import Intel from "./intel.png";
import Cost from "./cost.png";
import Pitch1 from "./pitch-1.png";
import Pitch2 from "./pitch-2.png";
import Pitch3 from "./pitch-3.png";
import ListGroup from "react-bootstrap/ListGroup";
import FunctionalText from "./FunctionalText";

function FABCardContent(props) {
  const { card } = props;
  return (
    <div className="dis" style={{ position: "relative" }}>
      <div className="fab-card-header">
        {card.pitch !== undefined && <div className="pitch-container"></div>}
        {card.pitch !== undefined && card.pitch >= 1 && (
          <div
            className="pitch-circle"
            style={{
              left: 12,
              top: 7,
              backgroundColor: "red",
            }}
          ></div>
        )}
        {card.pitch !== undefined && (
          <div
            className="pitch-circle"
            style={{
              left: 6,
              top: 19,
              backgroundColor: card.pitch > 1 ? "red" : "#fff",
            }}
          ></div>
        )}
        {card.pitch !== undefined && (
          <div
            className="pitch-circle"
            style={{
              left: 18,
              top: 19,
              backgroundColor: card.pitch > 2 ? "red" : "#fff",
            }}
          ></div>
        )}
        {card.cost !== undefined && (
          <div className="card-cost">
            <strong>{card.cost}</strong>
          </div>
        )}

        <div
          className="card-name"
          style={{
            borderTop:
              card.pitch !== undefined
                ? card.pitch > 1
                  ? card.pitch === 2
                    ? "4px solid yellow"
                    : "4px solid blue"
                  : "4px solid red"
                : "none",
          }}
        >
          <strong>{card.name}</strong>
        </div>
      </div>
      <div className="card-type">
        <div style={{ padding: 6 }}>{card.type_text}</div>
      </div>
      <div className="card-stats" style={{ left: 0, borderRight: "1px solid" }}>
        {card.power !== undefined && (
          <>
            <img src={Atk} className="card-stats-img mr-3x" alt="Power" />
            <span>{card.power}</span>
          </>
        )}
        {card.intelligence !== undefined && (
          <>
            <img src={Intel} className="card-stats-img mr-3x" alt="Intellect" />
            <span>{card.intelligence}</span>
          </>
        )}
      </div>
      <div className="card-stats" style={{ right: 0, borderLeft: "1px solid" }}>
        {card.defense !== undefined && (
          <>
            <span>{card.defense}</span>
            <img src={Def} className="card-stats-img ml-3x" alt="Defense" />
          </>
        )}
        {card.health !== undefined && (
          <>
            <span className="mri-3x">{card.health}</span>
            <img src={Life} className="card-stats-img ml-3x" alt="Health" />
          </>
        )}
      </div>
      <div style={{ padding: "8px 4px", borderTop: "1px solid" }}>
        <FunctionalText text={card.functional_text} />
      </div>
    </div>
  );
}

function FABCardBasic(props) {
  const { card } = props;

  return (
    <ListGroup as="ol">
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{
          borderTop:
            card.pitch !== undefined
              ? card.pitch > 1
                ? card.pitch === 2
                  ? "4px solid yellow"
                  : "4px solid blue"
                : "4px solid red"
              : "none",
        }}
      >
        <div
          className="ms-2 me-auto"
          style={{
            height: 32,
          }}
        >
          {card.type_text}
        </div>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{ height: "150px", overflow: "hidden" }}
      >
        <div className="ms-2 me-auto">
          <FunctionalText text={card.functional_text} />
        </div>
      </ListGroup.Item>
      <ListGroup.Item as="li">
        <div
          style={{
            display: "flex",
            fontSize: 14,
            justifyContent: "space-evenly",
          }}
        >
          {card.power !== undefined && (
            <div>
              <img src={Atk} className="card-stats-img mr-3x" alt="Power" />
              <span>{card.power}</span>
            </div>
          )}
          {card.intelligence !== undefined && (
            <div>
              <img
                src={Intel}
                className="card-stats-img mr-3x"
                alt="Intellect"
              />
              <span>{card.intelligence}</span>
            </div>
          )}
          {card.defense !== undefined && (
            <div>
              <img src={Def} className="card-stats-img mr-3x" alt="Defense" />
              <span>{card.defense}</span>
            </div>
          )}
          {card.health !== undefined && (
            <div>
              <img src={Life} className="card-stats-img mr-3x" alt="Health" />
              <span>{card.health}</span>
            </div>
          )}
          {card.cost !== undefined && (
            <div>
              <img src={Cost} className="card-stats-img mr-3x" alt="Health" />
              <span>{card.cost}</span>
            </div>
          )}
          {card.pitch !== undefined && (
            <div>
              {card.pitch === 1 && (
                <img
                  src={Pitch1}
                  className="card-stats-img mr-3x"
                  alt="Pitch"
                />
              )}
              {card.pitch === 2 && (
                <img
                  src={Pitch2}
                  className="card-stats-img mr-3x"
                  alt="Pitch"
                />
              )}
              {card.pitch === 3 && (
                <img
                  src={Pitch3}
                  className="card-stats-img mr-3x"
                  alt="Pitch"
                />
              )}
              <span>{card.pitch}</span>
            </div>
          )}
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default function FABCard(props) {
  const { card, addCardToPrint, removeCardToPrint, fromSearch } = props;

  return (
    <Card className="fab-card">
      {!fromSearch && <FABCardContent card={card} />}
      {fromSearch && <FABCardBasic card={card} />}
      <Card.Body className="card-info no-print">
        <Card.Title style={{ fontSize: "1rem" }}>{card.name}</Card.Title>
        <Card.Text>{"(" + card.set_identifiers + ")"}</Card.Text>
      </Card.Body>
      <Card.Footer className="no-print">
        {addCardToPrint && (
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => addCardToPrint(card)}
          >
            Add
          </Button>
        )}
        {removeCardToPrint && (
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => removeCardToPrint(card)}
          >
            Remove
          </Button>
        )}
      </Card.Footer>
    </Card>
  );
}
