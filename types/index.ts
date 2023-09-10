import { Bishop } from "@/Pieces/bishop";
import { King } from "@/Pieces/king";
import { Knight } from "@/Pieces/knight";
import { Pawn } from "@/Pieces/pawn";
import { Queen } from "@/Pieces/queen";
import { Rock } from "@/Pieces/rock";

export type piecesType = Pawn | Knight | Bishop | Rock | King | Queen;

export type chessBoardProps = (piecesType | null)[][]

export interface constructorProps {
    name: string;
    currentPosition: string
    color: string
    startingSqareColor: string
    actualPosition?: string
}