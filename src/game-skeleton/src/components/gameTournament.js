import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import GameView from './gameView';
import TableResults from './tournament/tableResults'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {NOT_STARTED} from '../config'

const TournamentContext = React.createContext({});
class GameTournament extends Component {
    state = {
        showResults: true,
        buttonDisabled: false
    }
    resimulate = () => {
        this.setState(() => ({showResults: false}))
    }
    submitSolution = () => {
        this.setState(() => ({showResults: true}))
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
        return (
            <TournamentContext.Provider
                value={ {submitSolution: this.submitSolution}}
            >
                <GameView
                    {...this.props}
                    submitSolution={SubmitSolution}
                />
            </TournamentContext.Provider>
        )
    }
}

const SubmitSolution = () => (
    <TournamentContext.Consumer>
        {({submitSolution}) => (
            <Button
                variant="contained"
                onClick={() => submitSolution(NOT_STARTED)}
            >
                SUBMIT SOLUTION
            </Button>
        )}
    </TournamentContext.Consumer>
)

export default observer(GameTournament)