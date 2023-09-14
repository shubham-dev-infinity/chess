import { chessBoardProps, constructorProps } from "@/types"
import { cloneTheBoard } from "@/utils/chessboard.util"
import { possitionParser, possitionParserToStandardPosition } from "@/utils/possition.parser.utils"
import { isMovableSquare } from "@/utils/validator.utils"

export class Bishop {
    name: string  //e.g : pawn_a1
    currentPosition: string // e.g f4
    actualPosition: string  // e.g a2
    maxMoveDistanc = 7
    weight = 3
    color: string //black or white
    startingSqareColor: string
    type: string = 'bishop'

    constructor(args: constructorProps) {
        const { name, currentPosition, actualPosition, color, startingSqareColor } = args
        this.name = name
        this.currentPosition = currentPosition
        this.actualPosition = actualPosition ? actualPosition : currentPosition
        this.color = color
        this.startingSqareColor = startingSqareColor
    }

    possiblePath(chessBoard: chessBoardProps): number[][] {
        let [position_Row, position_Column]: [number, number] = possitionParser(this.currentPosition[0], this.currentPosition[1])
        let possiblePathArray: number[][] = [];

        //bishop can move into diagonal path. but can no cross over it's own color piece.

        //bishop can also move in all 4 direction. so we need to take care of all it's 4 direction

        //right diagonal forward
        let new_Position_Row: number = position_Row - 1;
        let new_Position_Column: number = position_Column + 1;
        while (new_Position_Row >= 0 && position_Column <= 7) {
            if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== this.color) || chessBoard[new_Position_Row][new_Position_Column] === null) {
                let clonned_Chessboard: chessBoardProps | null = cloneTheBoard(chessBoard);
                clonned_Chessboard[position_Row][position_Column] = null
                clonned_Chessboard[new_Position_Row][new_Position_Column] = this
                if (isMovableSquare(chessBoard, clonned_Chessboard, new_Position_Row, new_Position_Column)) {
                    possiblePathArray.push([new_Position_Row, new_Position_Column])
                }

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
            if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== this.color) || chessBoard[new_Position_Row][new_Position_Column] === null) {
                let clonned_Chessboard: chessBoardProps | null = cloneTheBoard(chessBoard);
                clonned_Chessboard[position_Row][position_Column] = null
                clonned_Chessboard[new_Position_Row][new_Position_Column] = this
                if (isMovableSquare(chessBoard, clonned_Chessboard, new_Position_Row, new_Position_Column)) {
                    possiblePathArray.push([new_Position_Row, new_Position_Column])
                }
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
            if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== this.color) || chessBoard[new_Position_Row][new_Position_Column] === null) {
                let clonned_Chessboard: chessBoardProps | null = cloneTheBoard(chessBoard);
                clonned_Chessboard[position_Row][position_Column] = null
                clonned_Chessboard[new_Position_Row][new_Position_Column] = this
                if (isMovableSquare(chessBoard, clonned_Chessboard, new_Position_Row, new_Position_Column)) {
                    possiblePathArray.push([new_Position_Row, new_Position_Column])
                }
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
            if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== this.color) || chessBoard[new_Position_Row][new_Position_Column] === null) {
                let clonned_Chessboard: chessBoardProps | null = cloneTheBoard(chessBoard);
                clonned_Chessboard[position_Row][position_Column] = null
                clonned_Chessboard[new_Position_Row][new_Position_Column] = this
                if (isMovableSquare(chessBoard, clonned_Chessboard, new_Position_Row, new_Position_Column)) {
                    possiblePathArray.push([new_Position_Row, new_Position_Column])
                }
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
    makeMove(chessBoard: chessBoardProps, position_Row: number, position_Column: number): chessBoardProps {
        let [position_Row_Current, position_Column_Current]: [number, number] = possitionParser(this.currentPosition[0], this.currentPosition[1])
        let clonned_Chessboard: chessBoardProps | null = cloneTheBoard(chessBoard)

        clonned_Chessboard[position_Row][position_Column] = this
        clonned_Chessboard[position_Row_Current][position_Column_Current] = null
      
        this.currentPosition = possitionParserToStandardPosition(position_Row, position_Column)
        return clonned_Chessboard
    }

}