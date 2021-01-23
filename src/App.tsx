import React from 'react';
import { HeartsGame } from './components/HeartsGames';
import NavBar from './components/NavBar';
import './styles/index.scss';

function App() {
  return (
    <>
      <NavBar />
      <HeartsGame />
    </>
  );
}

export default App;
