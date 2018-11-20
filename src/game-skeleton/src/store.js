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
      players:[],
      // properties for tournament
      tournamentMatches: [],
      currentMatch: {},
      scoresGrid: []
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
    this.winner = this.players.find(player => (player.id === this.scores.indexOf(Math.max(...this.scores))));
    this.currentMatch.winner = this.winner.id;
    const a = this.tournamentMatches.find(match => match.matchId === this.currentMatch.matchId)
    a.winner = this.winner.id;
    a.p1score = a.p1.id === a.winner ? 1 : 0;
    a.p2score = a.p2.id === a.winner ? 1 : 0;
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

  // generate Tournament Matches
  generateTournament (players) {
    const matchObject = {
      matchId: null,
      p1: null,
      p2: null,
      winner: null,
      p1score: 0,
      p2score: 0
    }
    const matches = new Array(...Array(players.length*(players.length-1)));
    let currentPlayer = 0;
    let player = players[currentPlayer];
    let match = 0;
    players.forEach(() => {
      for(let p of players) {
        matches[match] = {
          ...matchObject,
          matchId: match,
          p1: player,
          p2:p,
        };
        match++;
    }
    player = players[++currentPlayer];
    });
    this.tournamentMatches = matches;
    this.scoresGrid = players.map(player => ({
      ...player,
      name: player.name,
      player1Score: 0,
      player2Score: 0,
      total: 0,
      score: this.tournamentMatches.filter(match => match.p1.id === player.id)
    }));
  }
}

export default new passengerStore();