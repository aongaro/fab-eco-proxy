import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import Preview from "../images/preview.png";

export default function LandingCards({
  onAdd,
  onList,
}: {
  onAdd: () => void;
  onList: () => void;
}) {
  return (
    <>
      <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
        <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
          <h1 className="display-4 fw-bold lh-1">FAB Eco Proxy</h1>
          <p className="lead">
            An ink-saving proxy generator for Flesh & Blood™ cards. Test the
            cards you're missing before buying them, without wasting ink!
          </p>
          <Row className="justify-content-md-center">
            <Col md="4">
              <Card>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  <Icon.DropletHalf size="45" />
                  <p className="mb-1 mt-1 fs-6">NO IMAGES</p>
                  <p className="mb-1 fs-6">=</p>
                  <p className="mb-1 fs-6">LESS INK</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md="4">
              <Card>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  <Icon.PiggyBank size="45" />
                  <p className="mb-1 mt-1 fs-6">LESS INK</p>
                  <p className="mb-1 fs-6">=</p>
                  <p className="mb-1 fs-6">LESS COSTS</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md="4">
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
            <Col xs="12">
              <Card className="mt-4">
                <Card.Body style={{ textAlign: "left", fontSize: "0.8rem" }}>
                  <h4>Usage</h4>

                  <ol>
                    <li>
                      Click "Add Cards" and enter card names in the search
                      field. Then click "Add" on the cards you wish to print.
                    </li>
                    <li>
                      Or you can click "Import List" to import cards from a
                      list.
                    </li>
                    <li>Adjust cards quantity.</li>
                    <li>
                      Print using your browsers print fuctionality (landscape
                      for US Letter, portrait for A4) or click "Print".
                    </li>
                  </ol>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center mb-4 mb-lg-3 mt-4">
            <button
              type="button"
              className="btn btn-primary btn-lg px-4 me-md-2 fw-bold"
              onClick={() => onAdd()}
            >
              Add cards
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg px-4"
              onClick={() => onList()}
            >
              Import list
            </button>
          </div>
        </div>
        <div
          className="col-lg-4 p-0 overflow-hidden shadow-lg text-left offset-lg-1"
          style={{ textAlign: "left" }}
        >
          <img
            className="rounded-lg-3"
            src={Preview}
            alt="preview"
            width="720"
          ></img>
          {/* <h3>Usage</h3>

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
          </ol> */}
        </div>
      </div>
    </>
  );
}
