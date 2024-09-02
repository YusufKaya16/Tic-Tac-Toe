export default function TurnComponent({ status }) {
  return (
    <div className="turn-container">
      <img className="icon" src={`/public/${status}.svg`} alt="x" />
      <span className="turn x-s-text">TURN</span>
    </div>
  );
}
