import React, { Component, Fragment } from 'react';
import { Loop } from 'react-game-kit';
import Grid from '@material-ui/core/Grid'
import ScoreDisplay from './ScoreDisplay'
import {PLAY, NOT_STARTED, PAUSED, GAME_OVER} from '../constants'
import config from '../config';
import GameWindow from './gameWindow';
import WinningScreen from './WinningScreen';
import { observer } from 'mobx-react';

class GameView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      gameState: NOT_STARTED,
      gameOver: {
        status: true,
        message: 'Time Over'
      }
    }
  }
  componentDidMount () {
    this.props.store.players = this.props.gameData.players;
    this.props.store.resetGame();
    this.props.store.time = this.props.gameData.gameTime || config.time;
  }

  // end game
  endGame = (gameState = NOT_STARTED) => {
    this.setState(() => ({gameState}));
    this.props.store.resetGame();
    this.props.store.time = this.props.gameData.gameTime || config.time;
  }
  // start game
  startGame = (gameState = NOT_STARTED) => {
    this.setState(() => ({gameState}));
    this.props.store.mode = gameState;
  }
   // start game
   updateState = (gameState = NOT_STARTED) => {
    this.setState(() => ({gameState}));
  }
  // Pause Resume game
  pauseResumeGame = () => {
    this.props.store.mode = this.props.store.mode === PLAY ? PAUSED : PLAY;
    this.setState(() => ({gameState: this.props.store.mode }));
  }
  // Submit Solution
  submitSolution = (gameState = NOT_STARTED) => {
    this.setState(() => ({gameState}));
    this.endGame(gameState)
  }

  render() {
    const {gameState, gameOver} = this.state;
    const {store} = this.props;
    
    return (
      <Fragment>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <ScoreDisplay
              store={store}
              gameState={gameState}
              endGame={this.endGame}
              startGame={this.startGame}
              pauseResumeGame={this.pauseResumeGame}
              players={this.props.gameData.players}
            />
          </Grid>
          {gameState === NOT_STARTED ? (
            <div>Not Started</div> )
          : gameState === GAME_OVER ? (
            <WinningScreen
              gameOver={gameOver}
              winner={this.props.store.winner}
              restartGame={this.endGame}
              submitSolution={this.submitSolution}
            /> )
          : (
            <Loop>
              <Grid container spacing={16}>
                <Grid item xs={!this.props.gameData.singleWindowGame ? 6 : 12}>
                  <GameWindow {...this.props} updateGameState={this.startGame} />
                </Grid>
                {!this.props.gameData.singleWindowGame && (
                  <Grid item xs={6}>
                    <GameWindow {...this.props} />
                  </Grid>
                )}
              </Grid>
            </Loop>
          )
        }
        </Grid>
      </Fragment>
  )}
}

export default observer(GameView)