import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import GameView from './gameView';
import TableResults from './tournament/tableResults'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class GameTournament extends Component {
    state = {
        showResults: true,
        buttonDisabled: false
    }
    render() {
        const {showResults, buttonDisabled} = this.state;
        if (showResults) {
            return (
                <Grid container justify="center">
                    <Grid item xs={8}>
                        <TableResults botFiles={[]} />
                    </Grid>
                    <Grid item xs={8} >
                        <Grid container justify="flex-end">
                            <Button
                                disabled={buttonDisabled}
                                color="primary"
                                variant="contained"
                                onClick={this.resimulate}
                            >
                                RESIMULATE
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            )
        }
        return <GameView {...this.props} />
    }
}

export default observer(GameTournament)