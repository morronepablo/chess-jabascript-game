import { ROOT_DIV } from "../Helper/constants.js";
import { globalState } from "../index.js";

function whitePawnClick({ piece }) {
  const current_pos = piece.current_position;
  //on initial position
  if (current_pos[1] == "2") {
    const hightlightSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) + 1}`,
      `${current_pos[0]}${Number(current_pos[1]) + 2}`,
    ];
    console.log(hightlightSquareIds);
  }
}

function GlobalEvent() {
  ROOT_DIV.addEventListener("click", function (event) {
    if (event.target.localName === "img") {
      const clickId = event.target.parentNode.id;
      const flatArray = globalState.flat();
      const square = flatArray.find((el) => el.id == clickId);
      if (square.piece.piece_name === "WHITE_PAWN") {
        whitePawnClick(square);
      }
    }
  });
}

export { GlobalEvent };
