import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({})
const tableHeading = botFiles =>
  botFiles.map(bot => (
    <TableCell width="15" key={bot.name}>
      {bot.name}
    </TableCell>
  ));

const makeScoreGrid = (matches, handleOpeningGame, player1) =>
  matches.map((match, index) => (
    player1.id !== match.p2.id ? (
      <TableCell key={index}>
        <Button
          color="primary"
          className="restartGame gameScore"
          onClick={() => handleOpeningGame(match)}
        >
          {match.p1score}
        </Button>
      </TableCell>
    ) : <TableCell key={index} className='empty-cells' />
  ));

const TableResults = ({ scoresGrid, handleOpeningGame, players }) => (
  <Table id="game-result-table" border="0" align="center" cellSpacing={0}>
    <TableHead>
      <TableRow>
        <TableCell width="5" />
        <TableCell width="5" />
        {tableHeading(scoresGrid)}
        <TableCell width="10" className="cell-player-name">Won as Player 1</TableCell>
        <TableCell width="10" className="cell-player-name">Won as Player 2</TableCell>
        <TableCell width="10" className="cell-player-name">Overall Total</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell />
        <TableCell className="cell-player-number" rowSpan={scoresGrid.length + 1}>
          As Player 1
        </TableCell>
        <TableCell className="cell-player-number" colSpan={scoresGrid.length}>
          As Player 2
        </TableCell>
        <TableCell colSpan={3} />
      </TableRow>
      {scoresGrid.map((item, index) => {
        return (
          <TableRow key={index}>
            <TableCell>{item.name}</TableCell>
            {makeScoreGrid(item.score, handleOpeningGame, item)}
            <TableCell>{item.player1Score}</TableCell>
            <TableCell>{item.player2Score}</TableCell>
            <TableCell>{item.total}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);
export default withStyles(styles)(TableResults);
