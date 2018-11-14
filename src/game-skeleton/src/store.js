import { extendObservable } from 'mobx';
import config from './config';
import { NOT_STARTED, GAME_OVER } from './constants'

class passengerStore {
  constructor() {
    let position = config.playersStartingPoint;
    extendObservable(this, {
      time: config.time,
      prevTime: Date.now(),
      position: position,
      direction: config.defaultDirections,
      mode: NOT_STARTED,
      coins: [],
      scores : config.defaultScore,
      winner: {},
      players:[]
    });
  }
  updatePosition(playerId, newPosition) {
    this.position[playerId] = newPosition;
  }
  resetGame() {
    this.direction = config.defaultDirections;
    this.scores = config.defaultScore;
    this.position = config.playersStartingPoint;
    this.mode = NOT_STARTED;

  }
  updateDirection(playerId, newDirection) {
    this.direction[playerId] = newDirection;
  }
  updateMode(mode) {
    this.mode = mode;
  }
  endGame () {
    this.mode = GAME_OVER;
    this.winner = this.players[this.scores.indexOf(Math.max(...this.scores))];
  }

  createNewCoins(gameWidth, gameHeight, coinSize) {
    const isOverlap = ({x, y})=>{
      return Boolean(this.coins.find(coin=>
        coin.x >= (x - coinSize) &&
        coin.x <= (x + coinSize) &&
        coin.y >= (y - coinSize) &&
        coin.y <= (y + coinSize) ))
    }
    if (this.coins.length <= config.minCoins) {
      const numOfNewCoins = config.maxCoins - this.coins.length;
      for (let i = 0; i < numOfNewCoins; i++) {
        const coinPosition = {
          x: Math.floor(Math.random() * (gameWidth - coinSize)),
          y: Math.floor(Math.random() * (gameHeight - coinSize)),
          id: i
        };
        if(isOverlap(coinPosition)){
          i--;
        } else {
          this.coins.push(coinPosition);
        }
      }
    }
  }

}

export default new passengerStore();