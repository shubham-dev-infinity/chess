import { constructorProps } from "@/types";

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
}

