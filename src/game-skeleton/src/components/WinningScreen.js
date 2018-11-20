import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NOT_STARTED } from '../constants';
import PropTypes from 'prop-types';


const WinningScreen = ({ restartGame, gameOver, winner, children }) => {
  return (
    <Fragment>
      {gameOver.status && (
        <div className={"result-display"}>
          <Typography variant="headline">
            {gameOver.message}
            <br />
            {winner.name} wins the game!
          </Typography>
          <Button
            variant="contained"
            onClick={() => restartGame(NOT_STARTED)}
          >
            PLAY AGAIN
          </Button>
          <br></br>
          {typeof children === 'function' && children()}
        </div>
      )}
    </Fragment>
  )
}
WinningScreen.proTypes = {
  restartGame: PropTypes.func.isRequired,
  gameOver: PropTypes.object.isRequired,
  submitSolution: PropTypes.func.isRequired,
}

export default observer(WinningScreen);