import QuitButton from "./QuitButton";
import NextButton from "./NextButton";
import { srcs } from "./Global";

export default function ResultBox({
  message,
  winner,
  status,
  handleResetGame,
  dValue,
}) {
  return (
    <main className="result-box" style={{ display: `${!dValue && "none"}` }}>
      <section className="result-inner-box">
        <div className="result-inner-content">
          <span className="message" style={{ display: status && "none" }}>
            {message}
          </span>
          <div className="winner-player">
            <img className="game-image" src={winner.player} alt="" />
            <span
              className="winner-text"
              style={{
                color: `${
                  winner.player === srcs.srcX ? "#31c3bd" : status && "#A8BFC9"
                }`,
              }}
            >
              {winner.text}
            </span>
          </div>
          <div className="result-button-group">
            <QuitButton />
            <NextButton handleResetGame={handleResetGame} />
          </div>
        </div>
      </section>
    </main>
  );
}
