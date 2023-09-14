import { chessBoardProps, constructorProps } from "@/types"
import { cloneTheBoard } from "@/utils/chessboard.util"
import { possitionParser, possitionParserToStandardPosition } from "@/utils/possition.parser.utils"

export class Queen {
    name: string  //e.g : pawn_a1
    currentPosition: string // e.g f4
    actualPosition: string  // e.g a2
    color: string //black or white
    startingSqareColor: string
    maxMoveDistanc = 7
    weight = 9
    type: string = 'queen'

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