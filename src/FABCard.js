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
import { getCardTextFromCSV } from "./cardFromCSVUtils";
import ListGroup from "react-bootstrap/ListGroup";

function FABCardContent(props) {
  const { card, text } = props;
  return (
    <div className="dis" style={{ position: "relative" }}>
      <div className="fab-card-header">
        {card["Pitch"] !== "" && <div className="pitch-container"></div>}
        {card["Pitch"] !== "" && card["Pitch"] >= 1 && (
          <div
            className="pitch-circle"
            style={{
              left: 12,
              top: 7,
              backgroundColor: "red",
            }}
          ></div>
        )}
        {card["Pitch"] !== "" && (
          <div
            className="pitch-circle"
            style={{
              left: 6,
              top: 19,
              backgroundColor: card["Pitch"] > 1 ? "red" : "#fff",
            }}
          ></div>
        )}
        {card["Pitch"] !== "" && (
          <div
            className="pitch-circle"
            style={{
              left: 18,
              top: 19,
              backgroundColor: card["Pitch"] > 2 ? "red" : "#fff",
            }}
          ></div>
        )}
        {card["Cost"] !== "" && (
          <div className="card-cost">
            <strong>{card["Cost"]}</strong>
          </div>
        )}

        <div
          className="card-name"
          style={{
            borderTop:
              card["Pitch"] !== ""
                ? card["Pitch"] > 1
                  ? card["Pitch"] === 2
                    ? "4px solid yellow"
                    : "4px solid blue"
                  : "4px solid red"
                : "none",
          }}
        >
          <strong>{card["Name"]}</strong>
        </div>
      </div>
      <div className="card-type">
        <div style={{ padding: 6 }}>{card["Type Text"]}</div>
      </div>
      <div className="card-stats" style={{ left: 0, borderRight: "1px solid" }}>
        {card["Power"] !== "" && (
          <>
            <img src={Atk} className="card-stats-img mr-3x" alt="Power" />
            <span>{card["Power"]}</span>
          </>
        )}
        {card["Intelligence"] !== "" && (
          <>
            <img src={Intel} className="card-stats-img mr-3x" alt="Intellect" />
            <span>{card["Intelligence"]}</span>
          </>
        )}
      </div>
      <div className="card-stats" style={{ right: 0, borderLeft: "1px solid" }}>
        {card["Defense"] && (
          <>
            <span>{card["Defense"]}</span>
            <img src={Def} className="card-stats-img ml-3x" alt="Defense" />
          </>
        )}
        {card["Health"] && (
          <>
            <span className="mri-3x">{card["Health"]}</span>
            <img src={Life} className="card-stats-img ml-3x" alt="Health" />
          </>
        )}
      </div>
      <div style={{ padding: "8px 4px", borderTop: "1px solid" }}>
        {text.map((ck, i) => (
          <div style={{ fontSize: 10, padding: 2 }} key={i}>
            {ck.map((chunk, i) => {
              if (chunk.strong)
                return (
                  <span key={`ck-${i}`}>
                    <strong>{chunk.text} </strong>
                  </span>
                );
              if (chunk.italic)
                return (
                  <span key={`ck-${i}`}>
                    <i>{chunk.text} </i>
                  </span>
                );
              return <span key={`ck-${i}`}>{chunk.text} </span>;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function FABCardBasic(props) {
  const { card, text } = props;

  return (
    <ListGroup as="ol">
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{
          borderTop:
            card["Pitch"] !== ""
              ? card["Pitch"] > 1
                ? card["Pitch"] === 2
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
          {card["Type Text"]}
        </div>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{ height: "150px", overflow: "hidden" }}
      >
        <div className="ms-2 me-auto">
          {text.map((ck, i) => (
            <div style={{ fontSize: 10, padding: 2 }} key={i}>
              {ck.map((chunk, i) => {
                if (chunk.strong)
                  return (
                    <span key={`ck-${i}`}>
                      <strong>{chunk.text} </strong>
                    </span>
                  );
                if (chunk.italic)
                  return (
                    <span key={`ck-${i}`}>
                      <i>{chunk.text} </i>
                    </span>
                  );
                return <span key={`ck-${i}`}>{chunk.text} </span>;
              })}
            </div>
          ))}
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
          {card["Power"] !== "" && (
            <div>
              <img src={Atk} className="card-stats-img mr-3x" alt="Power" />
              <span>{card["Power"]}</span>
            </div>
          )}
          {card["Intelligence"] !== "" && (
            <div>
              <img
                src={Intel}
                className="card-stats-img mr-3x"
                alt="Intellect"
              />
              <span>{card["Intelligence"]}</span>
            </div>
          )}
          {card["Defense"] !== "" && (
            <div>
              <img src={Def} className="card-stats-img mr-3x" alt="Defense" />
              <span>{card["Defense"]}</span>
            </div>
          )}
          {card["Health"] !== "" && (
            <div>
              <img src={Life} className="card-stats-img mr-3x" alt="Health" />
              <span>{card["Health"]}</span>
            </div>
          )}
          {card["Cost"] !== "" && (
            <div>
              <img src={Cost} className="card-stats-img mr-3x" alt="Health" />
              <span>{card["Cost"]}</span>
            </div>
          )}
          {card["Pitch"] !== "" && (
            <div>
              {card["Pitch"] === 1 && (
                <img
                  src={Pitch1}
                  className="card-stats-img mr-3x"
                  alt="Pitch"
                />
              )}
              {card["Pitch"] === 2 && (
                <img
                  src={Pitch2}
                  className="card-stats-img mr-3x"
                  alt="Pitch"
                />
              )}
              {card["Pitch"] === 3 && (
                <img
                  src={Pitch3}
                  className="card-stats-img mr-3x"
                  alt="Pitch"
                />
              )}
              <span>{card["Pitch"]}</span>
            </div>
          )}
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default function FABCard(props) {
  const { card, addCardToPrint, removeCardToPrint, fromSearch } = props;
  const text = getCardTextFromCSV(card);

  return (
    <Card className="fab-card">
      {/* <Card.Img src={imgUrl} /> */}
      {!fromSearch && <FABCardContent card={card} text={text} />}
      {fromSearch && <FABCardBasic card={card} text={text} />}
      <Card.Body className="card-info no-print">
        <Card.Title style={{ fontSize: "1rem" }}>{card["Name"]}</Card.Title>
        <Card.Text>{"(" + card.ed + ")"}</Card.Text>
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
