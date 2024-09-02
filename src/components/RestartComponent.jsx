
export default function RestartComponent({ restartClick }) {
  return (
    <div className="return-container">
      <button  className="return-btn" onClick={restartClick}>
        <img
          className="return"
          src="/icon-restart.svg"
          alt="restart"
        />
      </button>
    </div>
  );
}
