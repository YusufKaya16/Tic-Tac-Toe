import IconGroup from "./IconGroup";
import TurnComponent from "./TurnComponent";
import RestartComponent from "./RestartComponent";
import GameBoxes from "./GameBoxes";
import { useState } from "react";
import DetailBoxes from "./DetailBoxes";
import { calculateWinner, srcs } from "./Global";
import ResultBox from "./ResultBox";
import { useLocation } from "react-router-dom";

export default function Game() {
  // the array which the boxes are in the array
  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [dValue, setdValue] = useState(true);
  const [xState, setXState] = useState(0);
  const [oState, setOState] = useState(0);
  const [tiedState, setTiedState] = useState(0);

  /*
    choose character for player 1,
    choose character for player 2 according to player 1
    Actually, the choice isn't important when playing with a user.
   */
  const player1 = useLocation().state;
  const player2 = player1 === "X" ? "O" : "X";

  // i value is the index number of a box
  const handleClick = (i) => {
    /*  the slice method returns the copy of the boxes array. 
    If we make operation with array in React, we must use copy of the array. */
    const newBoxes = boxes.slice();
    // winner control
    if (calculateWinner(newBoxes) || newBoxes[i]) {
      return;
    }

    newBoxes[i] = isXNext ? srcs.srcX : srcs.srcO;

    setBoxes(newBoxes);
    setIsXNext(!isXNext);
    setdValue(true);
  };

  const restartClick = () => {
    setBoxes(Array(9).fill(null));
    setIsXNext(true);
  };

  // const winner = calculateWinner(boxes);
  const winner = calculateWinner(boxes) ? calculateWinner(boxes) : null;
  // if all boxes are full, the every method returns true Otherwise returns false.
  const isBoxesFull = boxes.every((box) => box !== null);
  const status = isXNext ? "icon-x" : "icon-o";

  const handleResetGame = () => {
    restartClick();
    setdValue(!dValue);
    if (winner === srcs.srcX) {
      setXState((oldState) => oldState + 1);
    } else if (winner === srcs.srcO) {
      setOState((oldState) => oldState + 1);
    } else if (!winner && isBoxesFull) {
      setTiedState((oldState) => oldState + 1);
    }
  };

  return (
    <div>
      <main className="main-game-container">
        <header className="game-header">
          <IconGroup />
          <TurnComponent status={status} />
          <RestartComponent restartClick={restartClick} />
        </header>
        <section className="game-body-div">
          <GameBoxes
            boxes={boxes}
            gameStatus={calculateWinner(boxes)}
            isXNext={isXNext}
            handleClick={handleClick}
            selectedPlayer={player1}
            cpuOrUser={true}
          />
        </section>
        <footer className="game-footer">
          <DetailBoxes
            player1={`${player1} (P1)`}
            player2={`${player2} (P2)`}
            tied="TIED"
            xscore={`${player1 === "X" ? xState : oState}`}
            tiedScore={tiedState}
            oscore={`${player1 === "X" ? oState : xState}`}
            winner={winner}
          />
        </footer>
      </main>
      {/* kazanan bilgisi*/}
      {calculateWinner(boxes) || isBoxesFull ? (
        <ResultBox
          message={winner === srcs.srcX ? "PLAYER 1 WINS!" : "PLAYER 2 WINS!"}
          winner={{
            player: `${calculateWinner(boxes)}`,
            text: `${
              (winner && isBoxesFull) || (winner && !isBoxesFull)
                ? "TAKES THE ROUND"
                : "ROUND TIED"
            }`,
          }}
          status={!winner && isBoxesFull && isBoxesFull}
          handleResetGame={handleResetGame}
          dValue={dValue}
        />
      ) : null}
    </div>
  );
}
