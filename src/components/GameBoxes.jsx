import GameBox from "./GameBox";

export default function GameBoxes({ boxes, isXNext, handleClick, selectedPlayer, cpuOrUser }) {
  const renderBox = (i) => (
    <GameBox
      value={boxes[i]}
      isXNext={isXNext}
      handleClick={() => handleClick(i)}
      selectedPlayer={selectedPlayer}
      cpuOrUser={cpuOrUser}
    />
  );

  return (
    <div className="game-boxes-container">
      {/* her box'a index numarası atandı. Hangi kutuya basıldıysa handleClick box numarasına göre işlem yapıyor. */}
      {renderBox(0)}
      {renderBox(1)}
      {renderBox(2)}
      {renderBox(3)}
      {renderBox(4)}
      {renderBox(5)}
      {renderBox(6)}
      {renderBox(7)}
      {renderBox(8)}
    </div>
  );
}
