import DetailBox from "./DetailBox";

export default function DetailBoxes({
  player1,
  player2,
  tied,
  xscore,
  oscore,
  tiedScore,
}) {
  return (
    <div className="detailbox-container">
      <DetailBox player={player1} score={xscore} />
      <DetailBox player={tied} score={tiedScore} />
      <DetailBox player={player2} score={oscore} />
    </div>
  );
}
