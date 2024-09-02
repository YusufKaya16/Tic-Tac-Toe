import IconGroup from "./IconGroup";
import "../index.scss";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function StartGame() {
  const [player, setPlayer] = useState("X");

  const selectChar = (event) => {
    setPlayer(() => event.target.dataset.char);
  };

  return (
    <section className="game-card">
      <header className="card-header">
        <IconGroup />
      </header>
      <main className="card-body">
        <div className="card-body-inner">
          <div className="title ">
            <span className="title-text x-s-small">
              PICK PLAYER 1&apos;S MARK
            </span>
          </div>
          <div className="select-group">
            <div
              className={`select-bar ${player === "O" ? "slide" : ""}`}
            ></div>
            <div className="sec" onClick={selectChar} data-char="X">
              <img className="icon" src="/icon-x.svg" alt="x" />
            </div>
            <div className="sec" onClick={selectChar} data-char="O">
              <img className="icon" src="/icon-o.svg" alt="o" />
            </div>
          </div>
          <div className="footer">
            <span className="footer-text body-text">
              REMEMBER : X GOES FIRST
            </span>
          </div>
        </div>
      </main>
      <footer className="button-group">
        <Link to="/vscpu" state={player} className="game-button small-text">
          NEW GAME (VS CPU)
        </Link>
        <Link to="/vsplayer" state={player} className="game-button small-text">
          NEW GAME (VS PLAYER)
        </Link>
      </footer>
    </section>
  );
}
