import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';


const tableHeading = botFiles =>
  botFiles.map(bot => (
    <TableCell width="15" key={bot.name}>
      {bot.name}
    </TableCell>
  ));

const makeScoreGrid = (array, name, handleOpeningGame) =>
  array.map((item, index) => {
    let comp = true;
    let cell = 'number-won';
    switch (item.score) {
      case 1:
        break;
      case 0.5:
        cell = 'number-even';
        break;
      case 0:
        cell = 'number-lose';
        break;
      default:
        cell = 'empty-cells';
        comp = false;
        break;
    }
    return (
      <TableCell key={index} className={`cell-${cell}`}>
        {comp ? (
          <Button
            variant="contained"
            className="restartGame gameScore"
            onClick={() => handleOpeningGame(name, item.name)}
          >
            {item.score}
          </Button>
        ) : (
          ''
        )}
      </TableCell>
    );
  });

const TableResults = ({ botFiles, config, scoreToWin, handleOpeningGame }) => {
  const scoresGrid = [{
    name: 'sarab',
    player1Score: 2,
    player2Score: 3,
    total:5,
    score: [{
      name: 'Easy bot',
      score: 4
    },
    {
      name: 'sarab',
      score: 0
    }]
  },{
    name: 'Easy bot',
    player1Score: 2,
    player2Score: 3,
    total:7,
    score: [{
      name: 'sarab',
      score: 0
    },{
      name: 'Easy bot',
      score: 4
    }]
  },{
    name: 'Abhi',
    player1Score: 2,
    player2Score: 3,
    total:4,
    score: [{
      name: 'Easy bot',
      score: 4
    },
    {
      name: 'sarab',
      score: 0
    }]
  }];
  return (
    <Table id="game-result-table" border="0" align="center" cellSpacing={0}>
      <thead>
        <TableRow>
          <TableCell width="5" />
          <TableCell width="5" />
          {tableHeading(scoresGrid)}
          <TableCell width="10" className="cell-player-name">Won as Player 1</TableCell>
          <TableCell width="10" className="cell-player-name">Won as Player 2</TableCell>
          <TableCell width="10" className="cell-player-name">Overall Total</TableCell>
        </TableRow>
      </thead>
      <TableBody>
        <TableRow>
          <TableCell />
          <TableCell className="cell-player-number" rowSpan={botFiles.length + 1}>
            As Player 1
          </TableCell>
          <TableCell className="cell-player-number" colSpan={botFiles.length}>
            As Player 2
          </TableCell>
          <TableCell colSpan={3} />
        </TableRow>
        {scoresGrid.map((item, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              {makeScoreGrid(item.score, item.name, handleOpeningGame)}
              <TableCell>{item.player1Score}</TableCell>
              <TableCell>{item.player2Score}</TableCell>
              <TableCell>{item.total}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
export default TableResults;
