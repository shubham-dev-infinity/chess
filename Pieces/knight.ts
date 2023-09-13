import { chessBoardProps, constructorProps } from "@/types"
import { cloneTheBoard } from "@/utils/chessboard.util"
import { possitionParser } from "@/utils/possition.parser.utils"
import { isMovableSquare } from "@/utils/validator.utils"


export class Knight {
    name: string  //e.g : pawn_a1
    currentPosition: string // e.g f4
    actualPosition: string  // e.g a2
    maxMoveDistanc = 3
    weight = 3
    color: string //black or white
    startingSqareColor: string
    type: string = 'knight'

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

        //knight can move in all direction but with fix steps. his moving style is first it can move 2 position in all dierction and next one step 90deg of it's moving path.

        // so a knight have maximum  8 possible moving sqaure (when knight is placed center of board.)

        //this 2 variable will vari basis on checking other posible positions
        let new_Position_Row: number = position_Row - 2;
        let new_Position_Column: number = position_Column + 1;

        if (new_Position_Row >= 0 && new_Position_Column <= 7) {
            //now we will check at this position which piece is available. is opposite color piece is available then we can move or no piece available that time also we can move
            if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== this.color) || !chessBoard[new_Position_Row][new_Position_Column]) {
                let clonned_Chessboard: chessBoardProps | null = cloneTheBoard(chessBoard);
                clonned_Chessboard[position_Row][position_Column] = null
                clonned_Chessboard[new_Position_Row][new_Position_Column] = this
                if (isMovableSquare(chessBoard, clonned_Chessboard, new_Position_Row, new_Position_Column)) {
                    possiblePathArray.push([new_Position_Row, new_Position_Column])
                }
            }
        }

        new_Position_Row = position_Row - 1
        new_Position_Column = position_Column + 2

        if (new_Position_Row >= 0 && new_Position_Column <= 7) {
            //now we will check at this position which piece is available. is opposite color piece is available then we can move or no piece available that time also we can move
            if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== this.color) || !chessBoard[new_Position_Row][new_Position_Column]) {
                let clonned_Chessboard: chessBoardProps | null = cloneTheBoard(chessBoard);
                clonned_Chessboard[position_Row][position_Column] = null
                clonned_Chessboard[new_Position_Row][new_Position_Column] = this
                if (isMovableSquare(chessBoard, clonned_Chessboard, new_Position_Row, new_Position_Column)) {
                    possiblePathArray.push([new_Position_Row, new_Position_Column])
                }
            }
        }

        new_Position_Row = position_Row - 2
        new_Position_Column = position_Column - 1;

        if (new_Position_Row >= 0 && new_Position_Column >= 0) {
            //now we will check at this position which piece is available. is opposite color piece is available then we can move or no piece available that time also we can move
            if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== this.color) || !chessBoard[new_Position_Row][new_Position_Column]) {
                let clonned_Chessboard: chessBoardProps | null = cloneTheBoard(chessBoard);
                clonned_Chessboard[position_Row][position_Column] = null
                clonned_Chessboard[new_Position_Row][new_Position_Column] = this
                if (isMovableSquare(chessBoard, clonned_Chessboard, new_Position_Row, new_Position_Column)) {
                    possiblePathArray.push([new_Position_Row, new_Position_Column])
                }
            }
        }

        new_Position_Row = position_Row - 1
        new_Position_Column = position_Column - 2;

        if (new_Position_Row >= 0 && new_Position_Column >= 0) {
            //now we will check at this position which piece is available. is opposite color piece is available then we can move or no piece available that time also we can move
            if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== this.color) || !chessBoard[new_Position_Row][new_Position_Column]) {
                let clonned_Chessboard: chessBoardProps | null = cloneTheBoard(chessBoard);
                clonned_Chessboard[position_Row][position_Column] = null
                clonned_Chessboard[new_Position_Row][new_Position_Column] = this
                if (isMovableSquare(chessBoard, clonned_Chessboard, new_Position_Row, new_Position_Column)) {
                    possiblePathArray.push([new_Position_Row, new_Position_Column])
                }
            }
        }

        new_Position_Row = position_Row + 2
        new_Position_Column = position_Column - 1;

        if (new_Position_Row <= 7 && new_Position_Column >= 0) {
            //now we will check at this position which piece is available. is opposite color piece is available then we can move or no piece available that time also we can move
            if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== this.color) || !chessBoard[new_Position_Row][new_Position_Column]) {
                let clonned_Chessboard: chessBoardProps | null = cloneTheBoard(chessBoard);
                clonned_Chessboard[position_Row][position_Column] = null
                clonned_Chessboard[new_Position_Row][new_Position_Column] = this
                if (isMovableSquare(chessBoard, clonned_Chessboard, new_Position_Row, new_Position_Column)) {
                    possiblePathArray.push([new_Position_Row, new_Position_Column])
                }
            }
        }

        new_Position_Row = position_Row + 1
        new_Position_Column = position_Column - 2;

        if (new_Position_Row <= 7 && new_Position_Column >= 0) {
            //now we will check at this position which piece is available. is opposite color piece is available then we can move or no piece available that time also we can move
            if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== this.color) || !chessBoard[new_Position_Row][new_Position_Column]) {
                let clonned_Chessboard: chessBoardProps | null = cloneTheBoard(chessBoard);
                clonned_Chessboard[position_Row][position_Column] = null
                clonned_Chessboard[new_Position_Row][new_Position_Column] = this
                if (isMovableSquare(chessBoard, clonned_Chessboard, new_Position_Row, new_Position_Column)) {
                    possiblePathArray.push([new_Position_Row, new_Position_Column])
                }
            }
        }

        new_Position_Row = position_Row + 1
        new_Position_Column = position_Column + 2;

        if (new_Position_Row <= 7 && new_Position_Column <= 7) {
            //now we will check at this position which piece is available. is opposite color piece is available then we can move or no piece available that time also we can move
            if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== this.color) || !chessBoard[new_Position_Row][new_Position_Column]) {
                let clonned_Chessboard: chessBoardProps | null = cloneTheBoard(chessBoard);
                clonned_Chessboard[position_Row][position_Column] = null
                clonned_Chessboard[new_Position_Row][new_Position_Column] = this
                if (isMovableSquare(chessBoard, clonned_Chessboard, new_Position_Row, new_Position_Column)) {
                    possiblePathArray.push([new_Position_Row, new_Position_Column])
                }
            }
        }
        new_Position_Row = position_Row + 2
        new_Position_Column = position_Column + 1;

        if (new_Position_Row <= 7 && new_Position_Column <= 7) {
            //now we will check at this position which piece is available. is opposite color piece is available then we can move or no piece available that time also we can move
            if ((chessBoard[new_Position_Row][new_Position_Column] && chessBoard[new_Position_Row][new_Position_Column]?.color !== this.color) || !chessBoard[new_Position_Row][new_Position_Column]) {
                let clonned_Chessboard: chessBoardProps | null = cloneTheBoard(chessBoard);
                clonned_Chessboard[position_Row][position_Column] = null
                clonned_Chessboard[new_Position_Row][new_Position_Column] = this
                if (isMovableSquare(chessBoard, clonned_Chessboard, new_Position_Row, new_Position_Column)) {
                    possiblePathArray.push([new_Position_Row, new_Position_Column])
                }
            }
        }
        return possiblePathArray
    }

    makeMove() { }
}