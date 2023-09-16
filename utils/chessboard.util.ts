'use client'
import { Bishop } from "@/Pieces/bishop";
import { King } from "@/Pieces/king";
import { Knight } from "@/Pieces/knight";
import { Pawn } from "@/Pieces/pawn";
import { Queen } from "@/Pieces/queen";
import { Rock } from "@/Pieces/rock";
import { chessBoardProps } from "@/types";
import * as _ from "lodash";

export function cloneTheBoard(chessBoard: chessBoardProps): chessBoardProps {

    return _.cloneDeep(chessBoard)
}

export default function getChessBoard(): chessBoardProps {
    const chessBoard: chessBoardProps = new Array();
    const row_: number = 8;
    const column_: number = 8;

    //first we will assign null value to all squares
    for (let row = 0; row < row_; row++) {
        chessBoard.push(new Array(column_).fill(null))
    }

    //now we will place 32 pieces over the board

    //first all 16 pieces of white

    //let first place all white pawn on board. so let's declare 8 white pawns
    const Pawn_a2 = new Pawn({ color: 'white', name: 'pawn_a2', currentPosition: 'a2', startingSqareColor: 'white' });
    const Pawn_b2 = new Pawn({ color: 'white', name: 'pawn_b2', currentPosition: 'b2', startingSqareColor: 'black' });
    const Pawn_c2 = new Pawn({ color: 'white', name: 'pawn_c2', currentPosition: 'c2', startingSqareColor: 'white' });
    const Pawn_d2 = new Pawn({ color: 'white', name: 'pawn_d2', currentPosition: 'd2', startingSqareColor: 'black' });
    const Pawn_e2 = new Pawn({ color: 'white', name: 'pawn_e2', currentPosition: 'e2', startingSqareColor: 'white' });
    const Pawn_f2 = new Pawn({ color: 'white', name: 'pawn_f2', currentPosition: 'f2', startingSqareColor: 'black' });
    const Pawn_g2 = new Pawn({ color: 'white', name: 'pawn_g2', currentPosition: 'g2', startingSqareColor: 'white' });
    const Pawn_h2 = new Pawn({ color: 'white', name: 'pawn_h2', currentPosition: 'h2', startingSqareColor: 'black' });

    chessBoard[6][0] = Pawn_a2;
    chessBoard[6][1] = Pawn_b2;
    chessBoard[6][2] = Pawn_c2;
    chessBoard[6][3] = Pawn_d2;
    chessBoard[6][4] = Pawn_e2;
    chessBoard[6][5] = Pawn_f2;
    chessBoard[6][6] = Pawn_g2;
    chessBoard[6][7] = Pawn_h2;

    //let place both white sqare and black square knight 
    const Knight_b1 = new Knight({ color: 'white', name: 'knight_b1', currentPosition: 'b1', startingSqareColor: 'white' });
    const Knight_g1 = new Knight({ color: 'white', name: 'knight_g1', currentPosition: 'g1', startingSqareColor: 'black' });

    chessBoard[7][1] = Knight_b1;
    chessBoard[7][6] = Knight_g1;

    //let place both white sqaure and black square bishop
    const Bishop_c1 = new Bishop({ color: 'white', name: 'bishop_c1', currentPosition: 'c1', startingSqareColor: 'black' });
    const Bishop_f1 = new Bishop({ color: 'white', name: 'bishop_f1', currentPosition: 'f1', startingSqareColor: 'white' });

    chessBoard[7][2] = Bishop_c1;
    chessBoard[7][5] = Bishop_f1;

    //let place both white sqaure and black square rock
    const Rock_a1 = new Rock({ color: 'white', name: 'rock_a1', currentPosition: 'a1', startingSqareColor: 'black' });
    const Rock_h1 = new Rock({ color: 'white', name: 'rock_h1', currentPosition: 'h1', startingSqareColor: 'white' });

    chessBoard[7][0] = Rock_a1;
    chessBoard[7][7] = Rock_h1;

    //let place king -> for white's king it will place in black square in starting
    const King_e1 = new King({ color: 'white', name: 'king_e1', currentPosition: 'e1', startingSqareColor: 'black' })

    chessBoard[7][4] = King_e1

    //let place queen -> for white's queen  it will place in white square in starting
    const Queen_d1 = new Queen({ color: 'white', name: 'queen_d1', currentPosition: 'd1', startingSqareColor: 'white' })

    chessBoard[7][3] = Queen_d1;





    //let place all 16 pieces of black
    const Pawn_a7 = new Pawn({ color: 'black', name: 'pawn_a7', currentPosition: 'a7', startingSqareColor: 'white' });
    const Pawn_b7 = new Pawn({ color: 'black', name: 'pawn_b7', currentPosition: 'b7', startingSqareColor: 'black' });
    const Pawn_c7 = new Pawn({ color: 'black', name: 'pawn_c7', currentPosition: 'c7', startingSqareColor: 'white' });
    const Pawn_d7 = new Pawn({ color: 'black', name: 'pawn_d7', currentPosition: 'd7', startingSqareColor: 'black' });
    const Pawn_e7 = new Pawn({ color: 'black', name: 'pawn_e7', currentPosition: 'e7', startingSqareColor: 'white' });
    const Pawn_f7 = new Pawn({ color: 'black', name: 'pawn_f7', currentPosition: 'f7', startingSqareColor: 'black' });
    const Pawn_g7 = new Pawn({ color: 'black', name: 'pawn_g7', currentPosition: 'g7', startingSqareColor: 'white' });
    const Pawn_h7 = new Pawn({ color: 'black', name: 'pawn_h7', currentPosition: 'h7', startingSqareColor: 'black' });

    chessBoard[1][0] = Pawn_a7;
    chessBoard[1][1] = Pawn_b7;
    chessBoard[1][2] = Pawn_c7;
    chessBoard[1][3] = Pawn_d7;
    chessBoard[1][4] = Pawn_e7;
    chessBoard[1][5] = Pawn_f7;
    chessBoard[1][6] = Pawn_g7;
    chessBoard[1][7] = Pawn_h7;

    //let place both white sqare and black square knight for black
    const Knight_b8 = new Knight({ color: 'black', name: 'knight_b8', currentPosition: 'b8', startingSqareColor: 'black' });
    const Knight_g8 = new Knight({ color: 'black', name: 'knight_g8', currentPosition: 'g8', startingSqareColor: 'black' });

    chessBoard[0][1] = Knight_b8;
    chessBoard[0][6] = Knight_g8;

    //let place both white sqaure and black square bishop
    const Bishop_c8 = new Bishop({ color: 'black', name: 'bishop_c8', currentPosition: 'c8', startingSqareColor: 'white' });
    const Bishop_f8 = new Bishop({ color: 'black', name: 'bishop_f8', currentPosition: 'f8', startingSqareColor: 'black' });

    chessBoard[0][2] = Bishop_c8;
    chessBoard[0][5] = Bishop_f8;

    //let place both white sqaure and black square rock
    const Rock_a8 = new Rock({ color: 'black', name: 'rock_a8', currentPosition: 'a8', startingSqareColor: 'white' });
    const Rock_h8 = new Rock({ color: 'black', name: 'rock_h8', currentPosition: 'h8', startingSqareColor: 'black' });

    chessBoard[0][0] = Rock_a8;
    chessBoard[0][7] = Rock_h8;

    //let place king -> for white's king it will place in black square in starting
    const King_e8 = new King({ color: 'black', name: 'king_e8', currentPosition: 'e8', startingSqareColor: 'white' })

    chessBoard[0][4] = King_e8;

    //let place queen -> for white's queen  it will place in white square in starting
    const Queen_d8 = new Queen({ color: 'black', name: 'queen_d8', currentPosition: 'd8', startingSqareColor: 'black' })

    chessBoard[0][3] = Queen_d8;

    return chessBoard
}
