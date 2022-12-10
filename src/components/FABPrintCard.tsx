import React from "react";
import EcoProxyCard from "../db/interfaces";
import { Defense, Health, Intellect, Power } from "./FABCardStats";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

export default function FABCardContent({ card }: { card: EcoProxyCard }) {
  return (
    <div className="dis" style={{ position: "relative" }}>
      <div className="fab-card-header">
        {card.pitch !== undefined && card.pitch >= 1 && (
          <div className="pitch-container"></div>
        )}
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
        {card.pitch !== undefined && card.pitch >= 1 && (
          <div
            className="pitch-circle"
            style={{
              left: 6,
              top: 19,
              backgroundColor: card.pitch > 1 ? "red" : "#fff",
            }}
          ></div>
        )}
        {card.pitch !== undefined && card.pitch >= 1 && (
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
              card.pitch !== undefined && card.pitch > 0
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
        <div style={{ padding: 6 }}>{card.typeText}</div>
      </div>
      <div className="card-stats" style={{ left: 0, borderRight: "1px solid" }}>
        {card.power !== undefined && (
          <Power value={card.power} textRight={true} />
        )}
        {card.intellect !== undefined && (
          <Intellect value={card.intellect} textRight={true} />
        )}
      </div>
      <div className="card-stats" style={{ right: 0, borderLeft: "1px solid" }}>
        {card.defense !== undefined && <Defense value={card.defense} />}
        {card.life !== undefined && <Health value={card.life} />}
      </div>
      <div style={{ padding: "4px 4px", borderTop: "1px solid" }}>
        <div style={{ fontSize: 10, padding: 2 }}>
          {card.functionalText && (
            <ReactMarkdown
              children={card.functionalText}
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ node, ...props }) => (
                  <p style={{ marginBottom: 5 }} {...props} />
                ),
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
