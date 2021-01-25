import React, { useEffect, useRef, useState } from "react";
import { HeartsGame } from "./components/HeartsGames";
import NavBar from "./components/NavBar";
import "./styles/index.scss";

function App() {
  const navBarRef = useRef<HTMLDivElement>(null);
  const [navBarHeight, setNavBarHeight] = useState(64);
  useEffect(() => {
    setNavBarHeight(navBarRef?.current?.clientHeight ?? 64);
  }, [navBarRef]);

  return (
    <>
      <div ref={navBarRef}>
        <NavBar />
      </div>
      <HeartsGame navBarHeight={navBarHeight} />
    </>
  );
}

export default App;
