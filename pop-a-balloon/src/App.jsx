/* eslint-disable no-unused-vars */

import './App.css';
import constants from './utils/constants';
import Game from "./components/Game/Game";

function App() {
  return (
    <>
      <Game 
        numberOfBalloons={constants.gameCells}
        gameDuration={constants.gameDuration}
      />
    </>
  )
}

export default App
