import React from "react";
import { ListGroup } from "react-bootstrap";
import EcoProxyCard from "../db/interfaces";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { Defense, Health, Intellect, Power, Cost, Pitch } from "./FABCardStats";

export default function FABCardBasic({ card }: { card: EcoProxyCard }) {
  return (
    <ListGroup as="ol">
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{
          borderTop:
            card.pitch !== undefined && card.pitch > 0
              ? card.pitch > 1
                ? card.pitch === 2
                  ? "4px solid yellow"
                  : "4px solid blue"
                : "4px solid red"
              : "4px solid white",
        }}
      >
        <div
          className="ms-2 me-auto"
          style={{
            height: 32,
          }}
        >
          {card.typeText}
        </div>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{ height: "150px", overflow: "hidden" }}
      >
        <div>
          <div style={{ fontSize: 10, padding: 2 }}>
            {card.functionalText && (
              <ReactMarkdown
                children={card.functionalText}
                remarkPlugins={[remarkGfm]}
              />
            )}
          </div>
        </div>
      </ListGroup.Item>
      <ListGroup.Item as="li" style={{ minHeight: 38 }}>
        <div
          style={{
            display: "flex",
            fontSize: 14,
            justifyContent: "space-evenly",
          }}
        >
          {card.power !== undefined && (
            <Power value={card.power} textRight={true} />
          )}
          {card.intellect !== undefined && (
            <Intellect value={card.intellect} textRight={true} />
          )}
          {card.defense !== undefined && (
            <Defense value={card.defense} textRight={true} />
          )}
          {card.life !== undefined && (
            <Health value={card.life} textRight={true} />
          )}
          {card.cost !== undefined && (
            <Cost value={card.cost} textRight={true} />
          )}
          {card.pitch !== undefined && card.pitch > 0 && (
            <Pitch value={card.pitch} />
          )}
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
}
