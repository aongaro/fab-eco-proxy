import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Modal,
  Nav,
  Navbar,
  Row,
  Badge,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import "./print.css";
import FABCard from "./components/FABCard";
import sortBy from "lodash/sortBy";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CardsDB } from "./db/cardDB";
import EcoProxyCard from "./db/interfaces";
import Logo from "./images/logopng.png";
import FABListInput from "./components/FABListInput";
import { Card as FabCard } from "@flesh-and-blood/types";
import FABCardManager from "./components/FABCardManager";
import HelpModal from "./components/HelpModal";
import SearchModal from "./components/SearchModal";
import * as Icon from "react-bootstrap-icons";
import LandingCards from "./components/LandingCards";
import Kofi from "./images/kofi.png";

function App() {
  const [cardsToPrint, setCardsToPrint] = useState<EcoProxyCard[]>(() =>
    CardsDB.getInstance().getCardsFromQueryParams("id")
  );
  const addCardToPrint = (card: FabCard) => {
    const ecocard: EcoProxyCard = { ...card, uuid: uuidv4() };
    setCardsToPrint((prev) => {
      return sortBy([...prev, ecocard], [(card) => card.name]);
    });
    toast.success("Card added!");
  };
  const removeCardToPrint = (index: number) => {
    setCardsToPrint((prev) => {
      var cardsCopy = [...prev];
      cardsCopy.splice(index, 1);
      return cardsCopy;
    });
  };

  const addFromList = (cards: EcoProxyCard[]) => {
    setCardsToPrint(cards);
    toast.success("Cards added!");
  };

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <div className="app-content">
        <Container className="App">
          <Navbar
            variant="light"
            expand="sm"
            fixed="top"
            className="no-print"
            style={{ backgroundColor: "#CCE2CB" }}
          >
            <Container>
              <Navbar.Brand>
                <img
                  alt=""
                  src={Logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{" "}
                FAB Eco Proxy
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto me-auto">
                  <Nav.Link onClick={() => setShowSearchModal(true)}>
                    Add Cards
                  </Nav.Link>
                  <Nav.Link onClick={() => setShowInputModal(true)}>
                    Import List{" "}
                    <Badge bg="warning" text="dark">
                      Beta
                    </Badge>
                  </Nav.Link>
                  <Nav.Link onClick={() => window.print()}>Print</Nav.Link>
                  <Nav.Link onClick={() => setShowHelpModal(true)}>
                    Help
                  </Nav.Link>
                </Nav>
                <Nav className="d-flex">
                  <Navbar.Text className="justify-content-end">
                    <a
                      href="https://ko-fi.com/Q5Q0GUWTY"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        style={{ border: 0, height: 25 }}
                        src={Kofi}
                        alt="Buy Me a Coffee at ko-fi.com"
                      />
                    </a>
                  </Navbar.Text>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <SearchModal
            show={showSearchModal}
            onHide={() => setShowSearchModal(false)}
            addCardToPrint={addCardToPrint}
            addedCards={cardsToPrint}
          />
          <HelpModal
            show={showHelpModal}
            onHide={() => setShowHelpModal(false)}
          />
          {showInputModal && (
            <Modal
              show={showInputModal}
              onHide={() => setShowInputModal(false)}
              aria-labelledby="search-modal-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="search-modal-title">
                  Add cards from list
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FABListInput
                  addCardsFromList={(cards) => addFromList(cards)}
                />
              </Modal.Body>
            </Modal>
          )}
          {showManageModal && (
            <FABCardManager
              cards={cardsToPrint}
              onAdd={(card) => addCardToPrint(card)}
              onRemove={(card) => {
                const idx = cardsToPrint.findIndex(
                  (c) => c.cardIdentifier === card.cardIdentifier
                );
                removeCardToPrint(idx);
              }}
              show={showManageModal}
              onHide={() => setShowManageModal(false)}
              onRemoveAll={() => {
                setCardsToPrint([]);
                setShowManageModal(false);
              }}
            />
          )}
          <div className="main">
            {cardsToPrint.length > 0 && (
              <Alert
                variant="info"
                className="no-print mb-2"
                style={{
                  textAlign: "left",
                  backgroundColor: "rgba(212, 240, 240, 0.2)",
                }}
              >
                <div className="d-flex ">
                  <div style={{ flex: 1 }}>
                    You added {cardsToPrint.length} cards.{" "}
                  </div>
                  <div className="d-flex justify-content-end align-items-center">
                    <Button
                      style={{ marginRight: 10 }}
                      onClick={() => window.print()}
                    >
                      <div className="d-flex justify-content-center align-items-center">
                        <Icon.Printer size={15} />
                      </div>
                    </Button>
                    <Button
                      style={{ marginRight: 10 }}
                      onClick={() => setShowSearchModal(true)}
                    >
                      <div className="d-flex justify-content-center align-items-center">
                        <Icon.Search size={15} />
                      </div>
                    </Button>
                    <Button
                      style={{ marginRight: 10 }}
                      onClick={() => setShowManageModal(true)}
                    >
                      <div className="d-flex justify-content-center align-items-center">
                        <Icon.ListTask size={15} />
                      </div>
                    </Button>
                  </div>
                </div>
              </Alert>
            )}
            <Row>
              <Col>
                <div className="card-list">
                  {cardsToPrint.map((card, i) => (
                    <FABCard
                      key={card.uuid}
                      card={card}
                      addCardToPrint={addCardToPrint}
                      removeCardToPrint={() => removeCardToPrint(i)}
                    />
                  ))}
                </div>
                {cardsToPrint.length === 0 && (
                  <LandingCards
                    onAdd={() => setShowSearchModal(true)}
                    onList={() => setShowInputModal(true)}
                  />
                )}
              </Col>
            </Row>
          </div>
        </Container>

        <footer className="p-3 mt-3 bg-light no-print" style={{ fontSize: 13 }}>
          <Row>
            <Col md="6">
              A special thanks to
              <ul>
                <li>
                  <a href="https://github.com/the-fab-cube/flesh-and-blood-cards">
                    The Fab Cube
                  </a>{" "}
                  for card lists.
                </li>
                <li>
                  <a href="https://github.com/fabrary/fab-cards">FaBrary</a> for
                  the awsome typescript fab-cards library .
                </li>
                <li>
                  <a href="https://github.com/cgilling/fab-proxy">cgilling</a>{" "}
                  as this project is inspired by their work.
                </li>
              </ul>
            </Col>
            <Col md="6">
              <p>
                If you liked this project (which is totally free), you can{" "}
                <a
                  href="https://ko-fi.com/Q5Q0GUWTY"
                  target="_blank"
                  rel="noreferrer"
                >
                  buy me a coffee
                </a>
              </p>
            </Col>
          </Row>
          <Row className="border-top py-2">
            <Col>
              <strong>FAB Eco Proxy</strong> is in no way affiliated with{" "}
              <a href="https://legendstory.com/">Legend Story Studios®</a>. All
              intellectual IP belongs to{" "}
              <a href="https://legendstory.com/">Legend Story Studios®</a>,
              Flesh & Blood™, and set names are trademarks of{" "}
              <a href="https://legendstory.com/">Legend Story Studios®</a>.
              Flesh and Blood™ characters, cards, logos, and art are property of{" "}
              <a href="https://legendstory.com/">Legend Story Studios®</a>.
            </Col>
          </Row>
        </footer>
      </div>
    </>
  );
}

export default App;
