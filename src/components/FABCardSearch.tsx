import React, { useEffect, useState } from "react";
import FABCard from "./FABCard";
import { cardDB, cardMap } from "../db/cardDB";
import { Col, Container, InputGroup, Row } from "react-bootstrap";
import EcoProxyCard from "../db/interfaces";
import { Index } from "lunr";

interface FABCardSearchProps {
  addCardToPrint: (card: EcoProxyCard) => void;
}

export default function FABCardSearch(props: FABCardSearchProps) {
  const { addCardToPrint } = props;
  const [searchTerm, setSearchTerm] = useState("fyen");
  const [results, setResults] = useState<Index.Result[]>([]);
  const handleChange = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    const queryString = "*" + searchTerm.trim().split(" ").join("* *") + "*";
    const res =
      searchTerm === "" ? [] : cardDB.search(queryString).slice(0, 20);
    setResults(res);
  }, [searchTerm]);

  return (
    <div className="card-search">
      <div className="card-search-header">
        <InputGroup>
          <InputGroup.Text>Search For Cards:</InputGroup.Text>

          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(event) => handleChange(event.target.value)}
          />
        </InputGroup>
      </div>
      <Container>
        <Row>
          {results.map((res, i) => (
            <Col md="3" xl="2" key={`${cardMap[res.ref].cardIdentifier}${i}`}>
              <FABCard
                card={cardMap[res.ref]}
                addCardToPrint={addCardToPrint}
                fromSearch={true}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
