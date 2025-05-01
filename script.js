function GameBoard() {
  const row = 3;
  const column = 3;
  const board = [];

  //2D Array Creation//
  for (let i = 0; i < row; i++) {
    board[i] = [];
    for (let j = 0; j < column; j++) {
      board[i].push(cell());
    }
  }
  //Get Board Data//
  const getBoard = () => board;

  const TicTac = (row, column, player) => {
    if (board[row][column].getToken() != 0) return;
    board[row][column].addToken(player);
  };

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getToken())
    );
    console.log(boardWithCellValues);
  };

  return { getBoard, TicTac, printBoard };
}

function cell() {
  //cell 0 - Unassigned//
  //cell 1 - Player 1//
  //cell 2 - Player 2//
  let value = 0;

  const addToken = (player) => {
    value = player;
  };

  const getToken = () => value;

  return { addToken, getToken };
}

function GameController(
  playerOneName = "Player One",
  playerTwoName = "player Two"
) {
  const gameStart = GameBoard();
  const players = [
    { name: playerOneName, token: 1 },
    { name: playerTwoName, token: 2 },
  ];
  //Init of Starting Player to Player 1//
  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer =
      activePlayer === players[0]
        ? (activePlayer = players[1])
        : (activePlayer = players[0]);
  };

  const getActivePlayer = () => activePlayer;

  const checkWinner = () => {
    const board = gameStart.getBoard();
    const size = board.length;

    //Check Row
    for (let row = 0; row < size; row++) {
      if (
        board[row][0].getToken() !== 0 &&
        board[row].every(
          (element) => element.getToken() === board[row][0].getToken()
        )
      ) {
        return board[row][0].getToken();
      }
    }

    //Check Column
    for (let col = 0; col < size; col++) {
      let testCase = [];
      for (let row = 0; row < size; row++) {
        testCase.push(board[row][col].getToken());
      }
      if (
        testCase[0] !== 0 &&
        testCase.every((element) => element === testCase[0])
      ) {
        return testCase[0];
      }
    }

    //Check Diagonal
    if (
      board[0][0].getToken() !== 0 &&
      board.every((_, index) => {
        return board[index][index].getToken() === board[0][0].getToken();
      })
    ) {
      return board[0][0].getToken();
    }

    //Check Anti Diagonal
    if (
      board[0][size - 1].getToken() !== 0 &&
      board.every((_, index) => {
        return (
          board[index][size - 1 - index].getToken() ===
          board[0][size - 1].getToken()
        );
      })
    ) {
      return board[0][size - 1].getToken();
    }

    //No Winner
    return null;
  };

  const printNewRound = () => {
    gameStart.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    console.log(
      `Dropping ${getActivePlayer().name}'s token into position ${row + 1},${
        column + 1
      }...`
    );

    gameStart.TicTac(row, column, getActivePlayer().token);

    switchPlayerTurn();
    printNewRound();
  };
  //Init start of game//
  printNewRound();

  return { playRound, getActivePlayer, checkWinner };
}

function DOMController() {}
