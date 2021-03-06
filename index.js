const Square = ({ id, newState }) => {
  const [color, setColor] = React.useState("green");
  //Set the player status to "O" & "X"
  const [status, setStatus] = React.useState(null);
  const xo = ["O", "X"];

  const palet = ["red", "blue", "green"];
  const getRandomColor = () => palet[Math.floor(Math.random() * 3)];

  React.useEffect(() => {
    console.log(`Render ${id}`);
    return () => console.log(`unmounting Square ${id}`);
  });
  // Keep track of state of the square
  return (
    // change color of Square on click
    <button
      onClick={(e) => {
        let col = getRandomColor(); //needed to use below
        setColor(col);
        let nextPlayer = newState(id);
        setStatus(nextPlayer);
        e.target.style.background = col;
      }}
    >
      <h1> {xo[status]} </h1>
    </button>
  );
};

function checkWinner(state) {
  //state is an array of 0 and 1 and null
  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < win.length; i++) {
    const [a, b, c] = win[i];
    if (state[a] == state[b] && state[a] == state[c] && state[a])
      return state[a];
  }
  return null;
}

const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [state, setState] = React.useState(Array(9).fill(null));
  const [mounted, setMounted] = React.useState(true);

  // set state here
  let status = `Player ${player}`;
  let winner = checkWinner(state);
  if (winner != null) status = `Player ${winner} wins`;

  // define newState function
  const newState = (idOfSquare) => {
    let thePlayer = player;
    state[idOfSquare] = player; //player is present player
    setState(state); // state is array of 0 or 1 or null
    let nextPlayer = (player + 1) % 2;
    setPlayer(nextPlayer);
    return thePlayer; // we need to return the player
  };

  const toggle = () => setMounted(!mounted);

  function renderSquare(i) {
    return <Square id={i} player={player} newState={newState}></Square>;
  }
  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <button onClick={toggle}>Show/Hide Row</button>
        <button>Re-Render</button>
        <h1>{status}</h1>
      </div>
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
