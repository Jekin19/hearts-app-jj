import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { ScoresTable } from "./ScoresTable";

const Scores = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <>
      <a href="#scores" onClick={() => setShow(true)} className="text-light nav-link">
        Scores
      </a>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header className="bg-dark p-2" closeButton>
          <Modal.Title className="text-light w-100 text-center">Scores</Modal.Title>
        </Modal.Header>
        <Modal.Body className="background-color text-light p-0">
          <ScoresTable />
        </Modal.Body>
        <Modal.Footer className="background-color bt-0 p-0"></Modal.Footer>
      </Modal>
    </>
  );
};

export default Scores;
