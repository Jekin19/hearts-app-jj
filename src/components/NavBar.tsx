import React from "react";
import { Button, Form, Navbar } from "react-bootstrap";

function NavBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="p-0 pl-3">
        <Navbar.Brand href="#home">
          <img src="./heart.ico" width="30" height="30" alt=""></img>
          
        </Navbar.Brand>
        <Form inline>
          <Button className="ml-3" variant="outline-success">
            New Game
          </Button>
        </Form>
      </Navbar>
    </>
  );
}

export default NavBar;
