import { useState } from "react";

const srcOutlines = {
  srcxOut: "/src/assets/icon-x-outline.svg",
  srcoOut: "/src/assets/icon-o-outline.svg",
};

export default function GameBox({
  value,
  isXNext,
  handleClick,
  selectedPlayer,
  cpuOrUser,
}) {
  const [hoverState, setHoverState] = useState(false);

  const mouseOverHandle = () => {
    setHoverState(true);
  };
  const mouseLeaveHandle = () => {
    setHoverState(false);
  };

  return (
    <div
      className={`game-box`}
      onClick={handleClick}
      onMouseOver={mouseOverHandle}
      onMouseLeave={mouseLeaveHandle}
    >
      {/* add x outline if value is null and hoverState is true and isXNext is true(X)
      Otherwise add o outline. Because value !== null in case of click, the outline is going to remove and the img of the o is going to add.*/}
      {!value ? (
        hoverState && (
          <img
            className="game-image"
            src={
              cpuOrUser
                ? isXNext
                  ? `${srcOutlines.srcxOut}`
                  : `${srcOutlines.srcoOut}`
                : !isXNext && selectedPlayer === "X"
                ? `${srcOutlines.srcxOut}`
                : `${srcOutlines.srcoOut}`
            }
            alt=""
          />
        )
      ) : (
        <img className="game-image" src={value} alt="" />
      )}
    </div>
  );
}
