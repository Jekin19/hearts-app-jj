import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const HowToPlay = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button variant="secondary" className="mr-2" onClick={() => setShow(true)}>
        How To Play
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header className="bg-dark p-2">
          <Modal.Title className="text-light w-100 text-center">How To Play</Modal.Title>
        </Modal.Header>
        <Modal.Body className="background-color text-light">
          <h5>
            <u>Rules</u>
          </h5>
          1) Player with the 2 of Clubs always makes the first lead starting with that card
          <br />
          2) Players to the left must follow suit and try to out rank the cards in play
          <br />
          3) If they cannot follow suit, then any card may be played. Lead suit trumps others
          <br />
          4) If a player does not have any Clubs to match the 2 on the first round, they cannot play any Hearts or the
          Queen of Spades
          <br />
          5) The winner of the round goes first in the next round
          <br /> <br />
          <h5>
            <u>Scoring</u>
          </h5>
          1) After all cards are played, players check their winning rounds and count the Hearts and the Queen of Spades
          <br />
          2) Hearts are worth 1 point each and the Queen of Spades is worth 13 points <br />
          3) Players want to avoid wining rounds with Hearts and the Queen of Spades <br />
          4) If a player wins all of the Hearts and the Queen of Spades in the game, the player receives no points and
          all other players receive 26 points
          <br />
        </Modal.Body>
        <Modal.Footer className="background-color bt-0 p-0">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default HowToPlay;
