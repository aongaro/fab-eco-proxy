import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { CardsDB } from "../db/cardDB";
import EcoProxyCard from "../db/interfaces";

const placeholder = `(1) Tiger Stripe Shuko\n(3) Belittle (red)\n(3) Blaze Headlong (red)\n(3) Brand with Cinderclaw (red)\n(1) Double Strike (red)\n(3) Flamecall Awakening (red)\n(3) Fyendal's Fighting Spirit (blue)`;

export default function FABListInput({
  addCardsFromList,
}: {
  addCardsFromList: (cards: EcoProxyCard[]) => void;
}) {
  const [tarea, setTarea] = useState("");
  const [match, setMatch] = useState<EcoProxyCard[]>([]);
  const [noMatch, setNoMatch] = useState<string[]>([]);
  return (
    <>
      {noMatch.length > 0 && (
        <Alert variant="warning" className="mb-2" style={{ textAlign: "left" }}>
          <div className="d-flex ">
            <div style={{ flex: 1 }}>
              <p>
                <strong>Unable to find {noMatch.length} cards.</strong>
              </p>{" "}
              <p>
                {noMatch.map(
                  (nm, i) => `${nm}${i < noMatch.length - 1 ? ", " : ""}`
                )}
              </p>
            </div>
          </div>
        </Alert>
      )}
      {match.length > 0 && (
        <Alert
          variant="info"
          className="mb-2"
          style={{ textAlign: "left", backgroundColor: "#D4F0F0" }}
        >
          <div className="d-flex ">
            <div style={{ flex: 1 }}>Found {match.length} cards. </div>
            <div className="d-flex justify-content-end"></div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => addCardsFromList(match)}
              style={{ marginRight: 10 }}
            >
              Add to print
            </Button>
          </div>
        </Alert>
      )}
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Paste in your list</label>
        <textarea
          onChange={(e) => setTarea(e.target.value)}
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={20}
          placeholder={placeholder}
        ></textarea>
      </div>
      <Button
        variant="outline-primary"
        style={{ marginRight: 5, marginTop: 10 }}
        onClick={() => {
          const res = CardsDB.getCardsFromList(tarea);
          setMatch(res.match);
          setNoMatch(res.noMatch);
        }}
        disabled={tarea === ""}
      >
        Find
      </Button>
    </>
  );
}
