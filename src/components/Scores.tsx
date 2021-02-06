import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import { useSelector } from 'react-redux';
import { getScores } from '../redux/reducers';
import { GridReadyEvent } from 'ag-grid-community';

interface IScore {
  round: number | string;
  player1: number;
  player2: number;
  player3: number;
  you: number;
}

const Scores = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [rowData, setRowData] = useState<Array<IScore>>([]);

  const scores = useSelector(getScores);
  useEffect(() => {
    const rowData = [];
    let runningScore = [0, 0, 0, 0];
    for (let i = 0; i < scores.length; i++) {
      runningScore = [
        runningScore[0] + scores[i][0],
        runningScore[1] + scores[i][1],
        runningScore[2] + scores[i][2],
        runningScore[3] + scores[i][3]
      ];
      rowData.push({
        round: i + 1,
        player1: scores[i][0],
        player2: scores[i][1],
        player3: scores[i][2],
        you: scores[i][3]
      } as IScore);
    }
    if (rowData.length > 1) {
      rowData.push({
        round: 'Total',
        player1: runningScore[0],
        player2: runningScore[1],
        player3: runningScore[2],
        you: runningScore[3]
      });
    }
    setRowData(rowData);
  }, [scores]);

  const columnDefs = [
    {
      field: 'round',
      width: 75
    },
    {
      field: 'you',
      width: 75
    },
    {
      field: 'player1',
      width: 75
    },
    {
      field: 'player2',
      width: 75
    },
    {
      field: 'player3',
      width: 75
    }
  ];

  const onGridReady = (event: GridReadyEvent) => {
    event?.api.sizeColumnsToFit();
  };

  const rowClassRules = {
    'sick-days-warning': function (params: any) {
      return params?.data?.round === 'Total';
    }
  };

  return (
    <>
      <Button variant="secondary" className="mr-2" onClick={() => setShow(true)}>
        Scores
      </Button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header className="bg-dark p-2" closeButton>
          <Modal.Title className="text-light w-100 text-center">Scores</Modal.Title>
        </Modal.Header>
        <Modal.Body className="background-color text-light p-0" style={{ height: 300 }}>
          <div className="ag-theme-balham-dark grid_border" style={{ height: '100%', width: '100%' }}>
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              onGridReady={onGridReady}
              rowClassRules={rowClassRules}
            >
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
