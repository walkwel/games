import React from 'react';
import ReactDOM from 'react-dom';
import { Game } from './game'
import { easyBot } from './bots/easyBot'
import { mediumBot } from './bots/mediumBot'

const App = () => {
  const props = {
    playMode: 'manual code',
    levelsToWin: 3,
    gameTime:  10,
    botsQuantities: 1,
    gameType: 'tournament',
    scoreToWin: 20,
    tournamentScoreToWin:  3,
    singleWindowGame: true,
    players: [{
      id:0,
      name: 'Tony',
      score: 0,
      character: 'GreenCar',
    }, {
      id: 1,
      name: 'Evan',
      score: 0,
      character: 'WhiteCar',
      isBot : true,
      botCode: easyBot,
    }, {
      id: 2,
      name: 'Bunty',
      score: 0,
      character: '',
      isBot : true,
      botCode: easyBot,
    }, {
      id: 3,
      name: 'Bot Father',
      score: 0,
      character: '',
      isBot : true,
      botCode: easyBot,
    }]
  }

  return (
    <Game
      gameData={props}
      onCommit={() => { }}
    />
  )
}

ReactDOM.render(<App />, document.getElementById('root'));