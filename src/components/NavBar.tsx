import React from "react";
import { Form, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getNavBarClassName } from "../common/mobileRules";
import { onNewGame } from "../redux/actions";
import Rules from "./Rules";
import Scores from "./Scores";

function NavBar() {
  const dispatch = useDispatch();
  return (
    <>
      <Navbar bg="dark" variant="dark" className={getNavBarClassName()}>
        <Navbar.Brand href="#home" className="mr-2">
          <img src="./heart.ico" width="30" height="30" alt=""></img>
        </Navbar.Brand>
        <Form inline className="mr-auto">
          <a href="#newGame" onClick={() => dispatch(onNewGame())} className="text-light nav-link">
            New Game
          </a>
        </Form>
        <Form inline>
          <Scores />
          <Rules />
        </Form>
      </Navbar>
    </>
  );
}

export default NavBar;
