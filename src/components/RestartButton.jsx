export default function RestartButton({ handleResetGame }) {
  return (
    <button className="restart-btn" onClick={handleResetGame}>
      YES, RESTART
    </button>
  );
}
