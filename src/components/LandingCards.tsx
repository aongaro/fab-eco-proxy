import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";

export default function LandingCards() {
  return (
    <>
      <h2>FAB Eco Proxy</h2>
      <p className="fs-5">
        An ink-saving proxy generator for Flesh & Blood™ cards. Test the cards
        you're missing before buying them, without wasting ink!
      </p>

      <Container>
        <Row className="justify-content-md-center">
          <Col md="3">
            <Card>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Icon.DropletHalf size="45" />
                <p className="mb-1 mt-1 fs-6">NO IMAGES</p>
                <p className="mb-1 fs-6">=</p>
                <p className="mb-1 fs-6">LESS INK</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Icon.PiggyBank size="45" />
                <p className="mb-1 mt-1 fs-6">LESS INK</p>
                <p className="mb-1 fs-6">=</p>
                <p className="mb-1 fs-6">SAVING MONEY</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md="3">
            <Card>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Icon.GlobeEuropeAfrica size="45" />
                <div>
                  <p className="mb-1 mt-1 fs-6">LESS INK</p>
                  <p className="mb-1 fs-6">=</p>
                  <p className="mb-1 fs-6">LESS WASTE</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
        <div style={{ textAlign: "left" }}>
          <h3>Usage</h3>

          <ol>
            <li>
              Click "Add Cards" and enter card names in the search field. Then
              click "Add" on the cards you wish to print.
            </li>
            <li>Or you can click "Import List" to import cards from a list.</li>
            <li>Adjust cards quantity.</li>
            <li>
              Print using your browsers print fuctionality (landscape for US
              Letter, portrait for A4) or click "Print".
            </li>
          </ol>
        </div>
      </Container>
    </>
  );
}
