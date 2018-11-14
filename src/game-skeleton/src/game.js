import React from 'react';
import GameView from './components/gameView';
import GameTournament from './components/gameTournament';
import Store from './store';

import './style.css';

const Game = props => (
    props.gameData.gameType === 'tournament' ?
        <GameTournament {...props} store={Store} />
    :   <GameView {...props} store={Store} />
);

export { Game }
