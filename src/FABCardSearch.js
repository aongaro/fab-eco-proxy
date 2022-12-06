import React, { useEffect, useState } from "react";
import FABCard from "./FABCard";
import { cardDB, cardMap } from "./cardsRepository";
import { Col, Container, InputGroup, Row } from "react-bootstrap";

export default function FABCardSearch(props) {
  const { addCardToPrint } = props;
  const [searchTerm, setSearchTerm] = useState("fyen");
  const [results, setResults] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
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
          <InputGroup.Prepend>
            <InputGroup.Text>Search For Cards:</InputGroup.Text>
          </InputGroup.Prepend>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleChange}
          />
        </InputGroup>
      </div>
      <Container>
        <Row>
          {results.map((res, i) => (
            <Col md="3" key={`${cardMap[res.ref].id}${i}`}>
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
