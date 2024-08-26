import IconGroup from "./IconGroup";
import TurnComponent from "./TurnComponent";
import RestartComponent from "./RestartComponent";
import GameBoxes from "./GameBoxes";
import { useState } from "react";
import DetailBoxes from "./DetailBoxes";
import { useLocation } from "react-router-dom";
import { calculateWinner, srcs } from "./Global";
import ResultBox from "./ResultBox";

export default function Game() {
  const selectedPlayer = useLocation().state; // player selected
  const cpuValue = selectedPlayer === "X" ? "O" : "X";
  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(selectedPlayer === "X" ? false : true);
  const [dValue, setdValue] = useState(true);
  const [xState, setXState] = useState(0);
  const [oState, setOState] = useState(0);
  const [tiedState, setTiedState] = useState(0);

  // i value is the index number of a box
  const handleClick = (i) => {
    // the slice method returns the copy of the boxes array. If we make operation with array in React, we must use copy of the array.
    const newBoxes = boxes.slice();
    // winner control
    if (calculateWinner(newBoxes) || newBoxes[i]) return;

    newBoxes[i] = selectedPlayer === "X" && !isXNext ? srcs.srcX : srcs.srcO;

    setBoxes(newBoxes);
    setIsXNext(!isXNext);
    setdValue(true);
  };

  const restartClick = () => {
    setBoxes(Array(9).fill(null));
    setIsXNext(selectedPlayer === "X" ? false : true);
  };

  const pcMove = () => {
    // filter the null boxes
    const emptyBoxes = boxes
      .map((val, index) => (val === null ? index : null))
      .filter((val) => val !== null);

    const randomIndex =
      emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];

    const newBoxes = boxes.slice();
    newBoxes[randomIndex] = `${cpuValue === "X" ? srcs.srcX : srcs.srcO}`;
    setBoxes(newBoxes);
    setIsXNext(!isXNext);
  };

  if (isXNext) {
    pcMove();
  }

  const winner = calculateWinner(boxes) ? calculateWinner(boxes) : null;
  const winnerChar = calculateWinner(boxes) === srcs.srcX ? "X" : "O";
  // if all boxes are full, the every method returns true Otherwise returns false.
  const isBoxesFull = boxes.every((box) => box !== null);
  const status = isXNext ? "icon-x" : "icon-o";

  // resultbox reset button
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
            isXNext={isXNext}
            handleClick={handleClick}
            selectedPlayer={selectedPlayer}
            cpuOrUser={false}
          />
        </section>
        <footer className="game-footer">
          <DetailBoxes
            player1={`${
              selectedPlayer === "X" ? selectedPlayer : cpuValue + " CPU"
            } (P1)`}
            player2={`${
              selectedPlayer === "X" ? cpuValue : selectedPlayer
            } (P2)`}
            tied="TIED"
            xscore={xState}
            tiedScore={tiedState}
            oscore={oState}
          />
        </footer>
      </main>
      {/* kazanan bilgisi*/}
      {calculateWinner(boxes) || isBoxesFull ? (
        <ResultBox
          message={
            winner
              ? winnerChar === selectedPlayer
                ? "YOU WON!"
                : "OH NO, YOU LOST..."
              : null
          }
          winner={{
            player: `${calculateWinner(boxes)}`,
            text: `${
              (winner && isBoxesFull) || (winner && !isBoxesFull)
                ? "TAKES THE ROUND"
                : "ROUND TIED"
            }`,
          }}
          status={winner && isBoxesFull ? !isBoxesFull : isBoxesFull}
          handleResetGame={handleResetGame}
          dValue={dValue}
        />
      ) : null}
    </div>
  );
}
