import React, { useEffect, useRef, useState } from "react";
import { HeartsGame } from "./components/HeartsGames";
import NavBar from "./components/NavBar";
import "./styles/index.scss";
import { RenderIf } from "./components/RenderIf";
import { getCurrentPhase } from "./redux/reducers";
import { GAME_PHASES } from "./redux/reducers/heartPhases";
import { useDispatch, useSelector } from "react-redux";
import { gameTick } from "./redux/actions";
import { defaultNavBarHeight } from "./common/mobileRules";
import { GameOver } from "./components/GameOver";

function App() {
  const navBarRef = useRef<HTMLDivElement>(null);
  const [navBarHeight, setNavBarHeight] = useState(defaultNavBarHeight(undefined));
  const isGameOver = useSelector(getCurrentPhase);

  const dispatch = useDispatch();
  const phase = useSelector(getCurrentPhase);
  useEffect(() => {
    dispatch(gameTick());
  }, [phase, dispatch]);

  useEffect(() => {
    setNavBarHeight(defaultNavBarHeight(navBarRef?.current?.clientHeight));
  }, [navBarRef]);

  return (
    <>
      <div ref={navBarRef}>
        <NavBar />
      </div>
      <RenderIf validate={isGameOver !== GAME_PHASES.GAME_END}>
        <GameOver />
      </RenderIf>
      <RenderIf validate={isGameOver === GAME_PHASES.GAME_END}>
        <HeartsGame navBarHeight={navBarHeight} />
      </RenderIf>
    </>
  );
}

export default App;
