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
        buttonDisabled: false,
        players:[],
        tournamentResults: []
    }
    componentDidMount () {
        this.props.store.generateTournament(this.props.gameData.players);
    }
    resimulate = () => {
        this.setState(() => ({showResults: false}))
    }
    submitSolution = () => {
        this.setState(() => ({showResults: true}))
    }
    // show table
    showTable = () => {
        this.setState(() => ({showResults: true}))
    }
    // open game
    handleOpeningGame = match => {
        this.props.store.currentMatch = match;
        this.setState(() => ({showResults: false, players: [match.p1, match.p2]}))
    }
    render() {
        const {showResults, buttonDisabled} = this.state;
        if (showResults) {
            return (
                <Grid container justify="center">
                    <Grid item xs={8}>
                        <TableResults
                            handleOpeningGame={this.handleOpeningGame}
                            scoresGrid={this.props.store.scoresGrid}
                            players={this.props.gameData.players}
                        />
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
                value={{
                    submitSolution: this.submitSolution,
                    showTable: this.showTable
                }}
            >
                <GameView
                    {...this.props}
                    gameData={{...this.props.gameData, players: this.state.players}}
                    submitSolution={SubmitSolution}
                    gameNav={GameNav}
                />
            </TournamentContext.Provider>
        )
    }
}
const GameNav = () => (
    <TournamentContext.Consumer>
        {({showTable}) => (
            <Button
                variant="contained"
                onClick={() => showTable(NOT_STARTED)}
            >
                Go Back To Results
            </Button>
        )}
    </TournamentContext.Consumer>
)
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