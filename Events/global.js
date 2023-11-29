import { ROOT_DIV } from "../Helper/constants.js";
import { globalState } from "../index.js";
import {
  renderHighlight,
  clearHighlight,
  selfHighlight,
  clearPreviousSelfHighlight,
  moveElement,
} from "../Render/main.js";

// highlighted or not => state
let highlight_state = false;

// current highlighted square state
let selfHighlightState = null;

// in move state or not
let moveState = null;

function whitePawnClick({ piece }) {
  // if clicked on same element twice
  if (piece == selfHighlightState) {
    console.log("hello");

    clearPreviousSelfHighlight(selfHighlightState);
    selfHighlightState = null;
    clearHighlight();
    return;
  }

  // highlight clicked element
  clearPreviousSelfHighlight(selfHighlightState);
  selfHighlight(piece);
  selfHighlightState = piece;

  // add piece as move state
  moveState = piece;

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
    } else {
      const childElementsOfclickedEl = Array.from(event.target.childNodes);

      if (
        childElementsOfclickedEl.length == 1 ||
        event.target.localName == "span"
      ) {
        if (event.target.localName == "span") {
          const id = event.target.parentNode.id;
          moveElement(moveState, id);
          moveState = null;
        } else {
          const id = event.target.id;
          moveElement(moveState, id);
          moveState = null;
        }
      } else {
        // clear highlights
        clearHighlight();
        clearPreviousSelfHighlight(selfHighlightState);
      }
    }
  });
}

export { GlobalEvent };
