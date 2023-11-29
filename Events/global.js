import { ROOT_DIV } from "../Helper/constants.js";
import { globalState } from "../index.js";
import {
  renderHighlight,
  clearHighlight,
  selfHighlight,
  clearPreviousSelfHighlight,
} from "../Render/main.js";

// highlighted or not => state
let highlight_state = false;

// current highlighted square state
let selfHighlightState = null;

function whitePawnClick({ piece }) {
  // highlight clicked element
  clearPreviousSelfHighlight(selfHighlightState);
  selfHighlight(piece);
  selfHighlightState = piece;

  const current_pos = piece.current_position;
  const flatArray = globalState.flat();
  //on initial position
  if (current_pos[1] == "2") {
    const highlightSquareIds = [
      `${current_pos[0]}${Number(current_pos[1]) + 1}`,
      `${current_pos[0]}${Number(current_pos[1]) + 2}`,
    ];

    // clear board for any previous highlight
    clearHighlight();

    highlightSquareIds.forEach((highlight) => {
      globalState.forEach((row) => {
        row.forEach((element) => {
          if (element.id == highlight) {
            element.highlight(true);
          }
        });
      });
    });
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
