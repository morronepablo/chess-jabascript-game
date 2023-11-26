import * as piece from "../Data/pieces.js";

const ROOT_DIV = document.getElementById("root");

// use when you want to render pieces on board
function pieceRender(data) {
  data.forEach((row) => {
    row.forEach((square) => {
      // if square has piece
      if (square.piece) {
        const squareEl = document.getElementById(square.id);

        // create piece
        const piece = document.createElement("img");
        piece.src = square.piece.img;
        piece.classList.add("piece");

        // insert piece into square element
        squareEl.appendChild(piece);
      }
    });
  });
}

// use when you want to render board for first time when game start
function initGameRender(data) {
  data.forEach((element) => {
    const rowEl = document.createElement("div");
    element.forEach((square) => {
      const squareDiv = document.createElement("div");
      squareDiv.id = square.id;
      squareDiv.classList.add(square.color, "square");

      // render black Pawn
      if (square.id[1] == 7) {
        square.piece = piece.blackPawn(square.id);
      }

      // render black Rook
      if (square.id == "h8" || square.id == "a8") {
        square.piece = piece.blackRook(square.id);
      }

      // render black Knight
      if (square.id == "g8" || square.id == "b8") {
        square.piece = piece.blackKnight(square.id);
      }

      // render black Queen
      if (square.id == "d8") {
        square.piece = piece.blackQueen(square.id);
      }

      // render black King
      if (square.id == "e8") {
        square.piece = piece.blackKing(square.id);
      }

      // render black Bishop
      if (square.id == "f8" || square.id == "c8") {
        square.piece = piece.blackBishop(square.id);
      }

      // render white Pawn
      if (square.id[1] == 2) {
        square.piece = piece.whitePawn(square.id);
      }

      // render white Queen
      if (square.id == "d1") {
        square.piece = piece.whiteQueen(square.id);
      }

      // render white King
      if (square.id == "e1") {
        square.piece = piece.whiteKing(square.id);
      }

      // render white Rook
      if (square.id == "h1" || square.id == "a1") {
        square.piece = piece.whiteRook(square.id);
      }

      // render white Knight
      if (square.id == "g1" || square.id == "b1") {
        square.piece = piece.whiteKnight(square.id);
      }

      // render white Bishop
      if (square.id == "f1" || square.id == "c1") {
        square.piece = piece.whiteBishop(square.id);
      }

      rowEl.appendChild(squareDiv);
    });
    rowEl.classList.add("squareRow");
    ROOT_DIV.appendChild(rowEl);
  });

  pieceRender(data);
}

export { initGameRender };
