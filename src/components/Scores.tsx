import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";

// const Scores = (scores: Array<any>) => {
const Scores = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [rowData] = useState([
    { rounds: 1, you: 4, player2: 10, player3: 10, player4: 2 },
    { rounds: 2, you: 14, player2: 0, player3: 8, player4: 4 },
    { rounds: 3, you: 0, player2: 26, player3: 26, player4: 26 },
  ]);

  const columnDefs = [
    {
      field: "rounds",
      width: 100,
      suppressSizeToFit: true,
    },
    {
      field: "you",
      width: 100,
      suppressSizeToFit: true,
    },
    {
      field: "player2",
      width: 100,
      suppressSizeToFit: true,
    },
    {
      field: "player3",
      width: 100,
      suppressSizeToFit: true,
    },
    {
      field: "player4",
      width: 100,
      suppressSizeToFit: true,
    },
  ];
  return (
    <>
      <Button variant="secondary" className="mr-2" onClick={() => setShow(true)}>
        Scores
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header className="bg-dark p-2" closeButton>
          <Modal.Title className="text-light w-100 text-center">Scores</Modal.Title>
        </Modal.Header>
        <Modal.Body className="background-color text-light p-0">
          <div className="ag-theme-balham-dark grid_border">
            <AgGridReact rowData={rowData} columnDefs={columnDefs} domLayout="autoHeight">
              <AgGridColumn field="rounds"></AgGridColumn>
              <AgGridColumn field="you"></AgGridColumn>
              <AgGridColumn field="player2"></AgGridColumn>
              <AgGridColumn field="player3"></AgGridColumn>
              <AgGridColumn field="player4"></AgGridColumn>
            </AgGridReact>
          </div>
        </Modal.Body>
        <Modal.Footer className="background-color bt-0 p-0"></Modal.Footer>
      </Modal>
    </>
  );
};

export default Scores;
