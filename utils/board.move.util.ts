import { chessBoardProps, piecesType } from "@/types";
import { possitionParser, possitionParserToStandardPosition } from "./possition.parser.utils";
import { cloneTheBoard } from "./chessboard.util";
import { Pawn } from "@/Pieces/pawn";
import { isMovableSquare } from "./validator.utils";

export function movePiece(chessBoard: chessBoardProps, piece: piecesType | null, position_Row: number, position_Column: number) {
    console.log(piece, 'piece')
    if (piece) {
        let [position_Row_Current, position_Column_Current]: [number, number] = possitionParser(piece.currentPosition[0], piece.currentPosition[1])
        let clonned_Chessboard: chessBoardProps | null = cloneTheBoard(chessBoard)
        clonned_Chessboard[position_Row][position_Column] = piece
        clonned_Chessboard[position_Row_Current][position_Column_Current] = null
        if (piece instanceof Pawn) {
            if (piece?.isFirstMove) {
                piece.isFirstMove = !piece.isFirstMove;
            }
        }
        piece.currentPosition = possitionParserToStandardPosition(position_Row, position_Column)
        return clonned_Chessboard
    } else {
        return chessBoard
    }

}
export function findPossiblePaths(chessBoard: chessBoardProps, piece: piecesType) {
    let possiblePaths: number[][] = [];
    switch (piece.type) {
        case 'pawn':
            possiblePaths = pawnPossiblePaths(chessBoard, piece);
            break;
        case 'knight':
            possiblePaths = knightPossiblePath(chessBoard, piece)
            break;
        case 'bishop':
            possiblePaths = bishopPossiblePaths(chessBoard, piece);
            break;
        case 'rock':
            possiblePaths = rockPossiblePaths(chessBoard, piece)
            break;
        case 'queen':
            possiblePaths = queenPossiblepaths(chessBoard, piece);
            break;
        case 'king':
            possiblePaths = kingPossiblePaths(chessBoard, piece);
            break;
    }
    return possiblePaths
}



function pawnPossiblePaths(chessBoard: chessBoardProps, piece: piecesType) {
    let [position_Row, position_Column]: [number, number] = possitionParser(piece.currentPosition[0], piece.currentPosition[1])
    let possiblePathArray: number[][] = [];
    //pawn only can move in one direction. and kill in diagonal direction. so we will have 3 posibilities
    // suppose current position is i->row , j->columns

    //we need to make logic for both white and black pieces and both move in opposite direction

    if (piece.color === 'black') {
        let new_Position_Row: number = position_Row + 1;
        let new_Position_Column: number = position_Column;
        //check validation for ahead move
        if ((new_Position_Row) <= 7 && chessBoard[new_Position_Row][new_Position_Column] === null) {
            reUsableTomovePiece(chessBoard, piece, position_Row, position_Column, new_Position_Row, new_Position_Column, possiblePathArray)
        }

        //if move is first then piece can move 2 step ahead

        new_Position_Row = position_Row + 2
        new_Position_Column = position_Column

        if (piece instanceof Pawn && piece.isFirstMove && new_Position_Row <= 7 && chessBoard[new_Position_Row][new_Position_Column] === null) {
            reUsableTomovePiece(chessBoard, piece, position_Row, position_Column, new_Position_Row, new_Position_Column, possiblePathArray)
        }

        //check validation for cross killing move -> right side kill. 1. piece do not need to cross board boundary. 2.piece shoube be there. 3.present piece color need to oposite
        new_Position_Row = position_Row + 1
        new_Position_Column = position_Column + 1
        if ((new_Position_Row <= 7 && new_Position_Column <= 7) && chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color != piece.color) {
            reUsableTomovePiece(chessBoard, piece, position_Row, position_Column, new_Position_Row, new_Position_Column, possiblePathArray)
        }

        //check validation for cross killing move ->  left side kill
        new_Position_Row = position_Row + 1;
        new_Position_Column = position_Column - 1;
        if ((new_Position_Row <= 7 && new_Position_Column >= 0) && chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color != piece.color) {
            reUsableTomovePiece(chessBoard, piece, position_Row, position_Column, new_Position_Row, new_Position_Column, possiblePathArray)
        }

    } else if (piece.color === 'white') {

        //check validation for ahead move
        let new_Position_Row: number = position_Row - 1;
        let new_Position_Column: number = position_Column;

        if ((new_Position_Row) >= 0 && chessBoard[new_Position_Row][new_Position_Column] === null) {
            reUsableTomovePiece(chessBoard, piece, position_Row, position_Column, new_Position_Row, new_Position_Column, possiblePathArray)
        }

        //if move is first then piece can move 2 step ahead
        new_Position_Row = position_Row - 2
        new_Position_Column = position_Column

        if (piece instanceof Pawn && piece.isFirstMove && new_Position_Row >= 0 && chessBoard[new_Position_Row][new_Position_Column] === null) {
            reUsableTomovePiece(chessBoard, piece, position_Row, position_Column, new_Position_Row, new_Position_Column, possiblePathArray)
        }

        //check validation for cross killing move -> right side kill. 1. piece do not need to cross board boundary. 2.piece shoube be there. 3.present piece color need to oposite
        new_Position_Row = position_Row - 1
        new_Position_Column = position_Column + 1
        if ((new_Position_Row >= 0 && new_Position_Column <= 7) && chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color != piece.color) {
            reUsableTomovePiece(chessBoard, piece, position_Row, position_Column, new_Position_Row, new_Position_Column, possiblePathArray)
        }

        //check validation for cross killing move ->  left side kill
        new_Position_Row = position_Row - 1;
        new_Position_Column = position_Column - 1;
        if ((new_Position_Row >= 0 && new_Position_Column >= 0) && chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color != piece.color) {
            reUsableTomovePiece(chessBoard, piece, position_Row, position_Column, new_Position_Row, new_Position_Column, possiblePathArray)
        }
    }

    return possiblePathArray;
}

function knightPossiblePath(chessBoard: chessBoardProps, piece: piecesType) {
    let [position_Row, position_Column]: [number, number] = possitionParser(piece.currentPosition[0], piece.currentPosition[1])
    let possiblePathArray: number[][] = [];

    //knight can move in all direction but with fix steps. his moving style is first it can move 2 position in all dierction and next one step 90deg of it's moving path.

    // so a knight have maximum  8 possible moving sqaure (when knight is placed center of board.)

    //piece 2 variable will vari basis on checking other posible positions
    let new_Position_Row: number = position_Row - 2;
    let new_Position_Column: number = position_Column + 1;

    if (new_Position_Row >= 0 && new_Position_Column <= 7) {
        //now we will check at piece position which piece is available. is opposite color piece is available then we can move or no piece available that time also we can move
        if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== piece.color) || !chessBoard[new_Position_Row][new_Position_Column]) {
            reUsableTomovePiece(chessBoard, piece, position_Row, position_Column, new_Position_Row, new_Position_Column, possiblePathArray)
        }
    }

    new_Position_Row = position_Row - 1
    new_Position_Column = position_Column + 2

    if (new_Position_Row >= 0 && new_Position_Column <= 7) {
        //now we will check at piece position which piece is available. is opposite color piece is available then we can move or no piece available that time also we can move
        if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== piece.color) || !chessBoard[new_Position_Row][new_Position_Column]) {
            reUsableTomovePiece(chessBoard, piece, position_Row, position_Column, new_Position_Row, new_Position_Column, possiblePathArray)
        }
    }

    new_Position_Row = position_Row - 2
    new_Position_Column = position_Column - 1;

    if (new_Position_Row >= 0 && new_Position_Column >= 0) {
        //now we will check at piece position which piece is available. is opposite color piece is available then we can move or no piece available that time also we can move
        if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== piece.color) || !chessBoard[new_Position_Row][new_Position_Column]) {
            reUsableTomovePiece(chessBoard, piece, position_Row, position_Column, new_Position_Row, new_Position_Column, possiblePathArray)
        }
    }

    new_Position_Row = position_Row - 1
    new_Position_Column = position_Column - 2;

    if (new_Position_Row >= 0 && new_Position_Column >= 0) {
        //now we will check at piece position which piece is available. is opposite color piece is available then we can move or no piece available that time also we can move
        if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== piece.color) || !chessBoard[new_Position_Row][new_Position_Column]) {
            reUsableTomovePiece(chessBoard, piece, position_Row, position_Column, new_Position_Row, new_Position_Column, possiblePathArray)
        }
    }

    new_Position_Row = position_Row + 2
    new_Position_Column = position_Column - 1;

    if (new_Position_Row <= 7 && new_Position_Column >= 0) {
        //now we will check at piece position which piece is available. is opposite color piece is available then we can move or no piece available that time also we can move
        if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== piece.color) || !chessBoard[new_Position_Row][new_Position_Column]) {
            reUsableTomovePiece(chessBoard, piece, position_Row, position_Column, new_Position_Row, new_Position_Column, possiblePathArray)
        }
    }

    new_Position_Row = position_Row + 1
    new_Position_Column = position_Column - 2;

    if (new_Position_Row <= 7 && new_Position_Column >= 0) {
        //now we will check at piece position which piece is available. is opposite color piece is available then we can move or no piece available that time also we can move
        if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== piece.color) || !chessBoard[new_Position_Row][new_Position_Column]) {
            reUsableTomovePiece(chessBoard, piece, position_Row, position_Column, new_Position_Row, new_Position_Column, possiblePathArray)
        }
    }

    new_Position_Row = position_Row + 1
    new_Position_Column = position_Column + 2;

    if (new_Position_Row <= 7 && new_Position_Column <= 7) {
        //now we will check at piece position which piece is available. is opposite color piece is available then we can move or no piece available that time also we can move
        if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== piece.color) || !chessBoard[new_Position_Row][new_Position_Column]) {
            reUsableTomovePiece(chessBoard, piece, position_Row, position_Column, new_Position_Row, new_Position_Column, possiblePathArray)
        }
    }
    new_Position_Row = position_Row + 2
    new_Position_Column = position_Column + 1;

    if (new_Position_Row <= 7 && new_Position_Column <= 7) {
        //now we will check at piece position which piece is available. is opposite color piece is available then we can move or no piece available that time also we can move
        if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== piece.color) || !chessBoard[new_Position_Row][new_Position_Column]) {
            reUsableTomovePiece(chessBoard, piece, position_Row, position_Column, new_Position_Row, new_Position_Column, possiblePathArray)
        }
    }
    return possiblePathArray
}

function bishopPossiblePaths(chessBoard: chessBoardProps, piece: piecesType) {
    let [position_Row, position_Column]: [number, number] = possitionParser(piece.currentPosition[0], piece.currentPosition[1])
    let possiblePathArray: number[][] = [];

    //bishop can move into diagonal path. but can no cross over it's own color piece.

    //bishop can also move in all 4 direction. so we need to take care of all it's 4 direction

    //right diagonal forward
    let new_Position_Row: number = position_Row - 1;
    let new_Position_Column: number = position_Column + 1;
    while (new_Position_Row >= 0 && position_Column <= 7) {
        if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== piece.color) || chessBoard[new_Position_Row][new_Position_Column] === null) {
            reUsableTomovePiece(chessBoard, piece, position_Row, position_Column, new_Position_Row, new_Position_Column, possiblePathArray)

            if (chessBoard[new_Position_Row][new_Position_Column]) {
                break;
            }
        } else {
            break;
        }
        new_Position_Row -= 1;
        new_Position_Column += 1;
    }

    //right diagonal backward
    new_Position_Row = position_Row + 1;
    new_Position_Column = position_Column - 1;
    while (new_Position_Row <= 7 && position_Column >= 0) {
        if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== piece.color) || chessBoard[new_Position_Row][new_Position_Column] === null) {
            reUsableTomovePiece(chessBoard, piece, position_Row, position_Column, new_Position_Row, new_Position_Column, possiblePathArray)
            if (chessBoard[new_Position_Row][new_Position_Column]) {
                break;
            }
        } else {
            break;
        }

        new_Position_Row += 1;
        new_Position_Column -= 1;
    }

    //left diagonal forward
    new_Position_Row = position_Row - 1;
    new_Position_Column = position_Column - 1;
    while (new_Position_Row >= 0 && position_Column >= 0) {
        if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== piece.color) || chessBoard[new_Position_Row][new_Position_Column] === null) {
            reUsableTomovePiece(chessBoard, piece, position_Row, position_Column, new_Position_Row, new_Position_Column, possiblePathArray)
            if (chessBoard[new_Position_Row][new_Position_Column]) {
                break;
            }
        } else {
            break;
        }
        new_Position_Row -= 1;
        new_Position_Column -= 1;
    }

    //left diagonal backward
    new_Position_Row = position_Row + 1;
    new_Position_Column = position_Column + 1;
    while (new_Position_Row <= 7 && position_Column <= 7) {
        if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== piece.color) || chessBoard[new_Position_Row][new_Position_Column] === null) {
            reUsableTomovePiece(chessBoard, piece, position_Row, position_Column, new_Position_Row, new_Position_Column, possiblePathArray)
            if (chessBoard[new_Position_Row][new_Position_Column]) {
                break;
            }
        } else {
            break;
        }
        new_Position_Row += 1;
        new_Position_Column += 1;
    }
    return possiblePathArray
}

function rockPossiblePaths(chessBoard: chessBoardProps, piece: piecesType) {
    let [position_Row, position_Column]: [number, number] = possitionParser(piece.currentPosition[0], piece.currentPosition[1])
    let possiblePathArray: number[][] = [];
    return possiblePathArray
}

function queenPossiblepaths(chessBoard: chessBoardProps, piece: piecesType) {
    let [position_Row, position_Column]: [number, number] = possitionParser(piece.currentPosition[0], piece.currentPosition[1])
    let possiblePathArray: number[][] = [];
    return possiblePathArray
}

function kingPossiblePaths(chessBoard: chessBoardProps, piece: piecesType) {
    let [position_Row, position_Column]: [number, number] = possitionParser(piece.currentPosition[0], piece.currentPosition[1])
    let possiblePathArray: number[][] = [];
    return possiblePathArray
}






function reUsableTomovePiece(chessBoard: chessBoardProps, piece: piecesType, position_Row: number, position_Column: number, new_Position_Row: number, new_Position_Column: number, possiblePathArray: number[][]) {
    let clonned_Chessboard: chessBoardProps | null = cloneTheBoard(chessBoard);
    clonned_Chessboard[position_Row][position_Column] = null
    clonned_Chessboard[new_Position_Row][new_Position_Column] = piece
    if (isMovableSquare(chessBoard, clonned_Chessboard, position_Row - 1, position_Column)) {
        possiblePathArray.push([new_Position_Row, new_Position_Column])
    }
}