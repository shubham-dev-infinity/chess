import { chessBoardProps, constructorProps } from "@/types"
import { possitionParser } from "@/utils/possition.parser.utils"


export class King {
    name: string  //e.g : pawn_a1
    currentPosition: string // e.g f4
    actualPosition: string  // e.g a2
    startingSqareColor: string //black or white
    color: string //black or white
    maxMoveDistanc: number = 1
    weight: number = 10
    type: string = 'king'

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
}