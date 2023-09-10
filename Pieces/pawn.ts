import { chessBoardProps, constructorProps } from "@/types";
import { cloneTheBoard } from "@/utils/chessboard.util";
import { possitionParser } from "@/utils/possition.parser.utils";
import { isMovableSquare } from "@/utils/validator.utils";


export class Pawn {
    name: string  //e.g : pawn_a1
    currentPosition: string // e.g f4
    actualPosition: string  // e.g a2
    maxMoveDistanc = 1
    weight = 1
    color: string //black or white
    startingSqareColor: string
    isFirstMove = true
    type: string = 'pawn'

    constructor(args: constructorProps) {
        const { name, currentPosition, actualPosition, color, startingSqareColor } = args
        this.name = name
        this.currentPosition = currentPosition
        this.actualPosition = actualPosition ? actualPosition : currentPosition
        this.color = color
        this.startingSqareColor = startingSqareColor
    }

    firstMoveComplerte() {
        this.isFirstMove = false
    }

    possiblePath(chessBoard: chessBoardProps): number[][] {
        let [position_Row, position_Column]: [number, number] = possitionParser(this.currentPosition[0], this.currentPosition[1])
        let possiblePathArray: number[][] = [];
        //pawn only can move in one direction. and kill in diagonal direction. so we will have 3 posibilities
        // suppose current position is i->row , j->columns

        //check validation for ahead move
        if ((position_Row - 1) >= 0 && chessBoard[position_Row - 1][position_Column] === null) {
            let clonned_Chessboard: chessBoardProps | null = cloneTheBoard(chessBoard);
            clonned_Chessboard[position_Row][position_Column] = null
            clonned_Chessboard[position_Row - 1][position_Column] = this
            if (isMovableSquare(chessBoard, clonned_Chessboard, position_Row - 1, position_Column)) {
                possiblePathArray.push([position_Row - 1, position_Column])
            }
        }

        //if move is first then piece can move 2 step ahead

        if (this.isFirstMove && position_Row - 2 >= 0 && chessBoard[position_Row - 2][position_Column] === null) {
            let clonned_Chessboard: chessBoardProps | null = cloneTheBoard(chessBoard);
            clonned_Chessboard[position_Row][position_Column] = null
            clonned_Chessboard[position_Row - 2][position_Column] = this
            if (isMovableSquare(chessBoard, clonned_Chessboard, position_Row - 2, position_Column)) {
                possiblePathArray.push([position_Row - 2, position_Column])
            }
        }

        //check validation for cross killing move -> right side kill. 1. piece do not need to cross board boundary. 2.piece shoube be there. 3.present piece color need to oposite
        if ((position_Row - 1 >= 0 && position_Column + 1 <= 7) && chessBoard[position_Row - 1][position_Column - 1] && chessBoard[position_Row - 1][position_Column + 1]?.color != this.color) {
            let clonned_Chessboard: chessBoardProps | null = cloneTheBoard(chessBoard);
            clonned_Chessboard[position_Row][position_Column] = null
            clonned_Chessboard[position_Row - 1][position_Column + 1] = this

            if (isMovableSquare(chessBoard, clonned_Chessboard, position_Row - 1, position_Column + 1)) {
                possiblePathArray.push([position_Row - 1, position_Column + 1])
            }
        }

        //check validation for cross killing move ->  left side kill
        if ((position_Row - 1 >= 0 && position_Column - 1 >= 0) && chessBoard[position_Row - 1][position_Column - 1] && chessBoard[position_Row - 1][position_Column - 1]?.color != this.color) {
            let clonned_Chessboard: chessBoardProps | null = cloneTheBoard(chessBoard);
            clonned_Chessboard[position_Row][position_Column] = null
            clonned_Chessboard[position_Row - 1][position_Column - 1] = this

            if (isMovableSquare(chessBoard, clonned_Chessboard, position_Row - 1, position_Column - 1)) {
                possiblePathArray.push([position_Row - 1, position_Column - 1])
            }
        }
        return possiblePathArray;
    }
}

