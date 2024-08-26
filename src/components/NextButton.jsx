export default function NextButton({ handleResetGame }) {
  return (
    <button className="next-button" onClick={handleResetGame}>
      NEXT ROUND
    </button>
  );
}
