import React, { useState } from "react";
import {
  Alert,
  Card,
  Button,
  Col,
  Container,
  Modal,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import "./print.css";
import FABCard from "./FABCard";
import sortBy from "lodash/sortBy";
import FABCardSearch from "./FABCardSearch";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cardsToPrint, setCardsToPrint] = useState([]);
  const addCardToPrint = (card) => {
    card = { ...card, uuid: uuidv4() };
    setCardsToPrint((prev) => {
      return sortBy([...prev, card], [(card) => card["Name"]]);
    });
    toast.success("Card added!");
  };
  const removeCardToPrint = (index) => {
    setCardsToPrint((prev) => {
      var cardsCopy = [...prev];
      cardsCopy.splice(index, 1);
      return cardsCopy;
    });
  };

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showKofi, setShowKofi] = useState(false);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <Container className="App">
        <Navbar
          bg="dark"
          variant="dark"
          expand="sm"
          fixed="top"
          className="no-print"
        >
          <Navbar.Brand>FAB Eco Proxy</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={() => setShowSearchModal(true)}>
                Add Cards
              </Nav.Link>
              <Nav.Link onClick={() => window.print()}>Print</Nav.Link>
              <Nav.Link onClick={() => setShowHelpModal(true)}>Help</Nav.Link>
              <Nav.Link onClick={() => setShowKofi(true)}>Donate</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {showKofi && (
          <Modal
            show={showKofi}
            onHide={() => setShowKofi(false)}
            dialogClassName="search-modal"
            aria-labelledby="search-modal-title"
          >
            <Modal.Body>
              <iframe
                id="kofiframe"
                src="https://ko-fi.com/aongaro/?hidefeed=true&widget=true&embed=true&preview=true"
                style={{
                  border: "none",
                  width: "100%",
                  padding: "4px",
                  background: "#f9f9f9",
                }}
                height="712"
                title="aongaro"
              ></iframe>
            </Modal.Body>
          </Modal>
        )}
        <Modal
          show={showSearchModal}
          onHide={() => setShowSearchModal(false)}
          dialogClassName="search-modal"
          aria-labelledby="search-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="search-modal-title">Search For Cards</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FABCardSearch addCardToPrint={addCardToPrint} />
          </Modal.Body>
        </Modal>
        <Modal
          show={showHelpModal}
          onHide={() => setShowHelpModal(false)}
          aria-labelledby="help-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="help-modal-title">
              How to use FAB Eco Proxy
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Usage</h3>

            <ol>
              <li>Click "Add Cards"</li>
              <li>Enter card names in the search field</li>
              <li>Click "Add" on the cards you wish to print</li>
              <li>Exit the modal and eventually adjust card quantities</li>
              <li>
                Print using your browsers print fuctionality (landscape for US
                Letter, portrait for A4)
              </li>
            </ol>
            <h3>Feedback</h3>
            <p>
              If you have any feedback, please create a{" "}
              <a href="https://github.com/aongaro/fab-eco-proxy/issues">
                github issue
              </a>
              , and I will try to respond within a reasonable time.
            </p>
          </Modal.Body>
        </Modal>
        {cardsToPrint.length > 0 && (
          <Alert variant="info" className="no-print" style={{ marginTop: 60 }}>
            <div className="d-flex ">
              <div style={{ flex: 1 }}>
                You added {cardsToPrint.length} cards.{" "}
              </div>
              <div className="d-flex justify-content-end"></div>
              <Button
                variant="primary"
                onClick={() => window.print()}
                style={{ marginRight: 10 }}
              >
                Print
              </Button>
              <Button
                variant="primary"
                onClick={() => setShowSearchModal(true)}
              >
                Add cards
              </Button>
            </div>
          </Alert>
        )}
        <Row className="main">
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
              <Card style={{ width: "100%" }}>
                <Card.Body>
                  <Card.Text>Start adding cards to the print list.</Card.Text>
                  <Card.Text style={{ textAlign: "left" }}>
                    <h3>Usage</h3>

                    <ol>
                      <li>Click "Add Cards"</li>
                      <li>Enter card names in the search field</li>
                      <li>Click "Add" on the cards you wish to print</li>
                      <li>
                        Exit the modal and eventually adjust card quantities
                      </li>
                      <li>
                        Print using your browsers print fuctionality (landscape
                        for US Letter, portrait for A4) or click "Print"
                      </li>
                    </ol>
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => setShowSearchModal(true)}
                  >
                    Add Cards
                  </Button>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
      <Container className="no-print bg-light text-muted mt-2">
        <footer className="p-5">
          <Row>
            <Col md="6">
              A special thanks to
              <ul>
                <li>
                  <a href="https://github.com/the-fab-cube/flesh-and-blood-cards">
                    The Fab Cube
                  </a>
                  for card lists.
                </li>
                <li>
                  <a href="https://github.com/cgilling/fab-proxy">cgilling</a>{" "}
                  as this project is inspired by their work.
                </li>
              </ul>
            </Col>
            <Col md="6">
              <p>If you liked this project (which is totally free), you can:</p>
              <Button variant="dark" onClick={() => setShowKofi(true)}>
                Support me
              </Button>
            </Col>
          </Row>
          <Row className="border-top py-4">
            <Col>
              <strong>FAB Eco Proxy</strong> is in no way affiliated with{" "}
              <a href="https://legendstory.com/">Legend Story Studios®</a>. All
              intellectual IP belongs to{" "}
              <a href="https://legendstory.com/">Legend Story Studios®</a>,
              Flesh & Blood™, and set names are trademarks of{" "}
              <a href="https://legendstory.com/">Legend Story Studios®</a>.{" "}
              Flesh and Blood™ characters, cards, logos, and art are property of{" "}
              <a href="https://legendstory.com/">Legend Story Studios®</a>.
            </Col>
          </Row>
        </footer>
      </Container>
    </>
  );
}

export default App;
