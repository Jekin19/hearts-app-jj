import React from 'react';
import { Button, Form, Navbar } from 'react-bootstrap';
import HowToPlay from './HowToPlay';

function NavBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="p-0 pl-3">
        <Navbar.Brand href="#home" className="mr-2">
          <img src="./heart.ico" width="30" height="30" alt=""></img>
        </Navbar.Brand>
        <Form inline className="mr-auto mt-2 mb-2">
          <p className={'heart-color font-weight-bold mb-0 header-size'}>Hearts </p>
          <Button className="ml-3 button-size" variant="outline-success">
            New Game
          </Button>
        </Form>
        <Form inline>
          <HowToPlay />
        </Form>
      </Navbar>
    </>
  );
}

export default NavBar;
