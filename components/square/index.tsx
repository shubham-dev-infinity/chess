'use client'

import { Pawn } from '@/Pieces/pawn';
import React from 'react'
import Piece from '../piece';
import styles from './styles.module.scss'
import { chessBoardProps, piecesType } from '@/types';

interface squareProps {
    color: string;
    piece: piecesType | null;
    chessBoard: chessBoardProps;
    className?: string;
}

const Square = (args: squareProps) => {
    const { className, piece, chessBoard } = args
    return (
        <div className={`${className} ${styles.piece_Wrapper}`} onClick={() => console.log(piece?.possiblePath(chessBoard), 'pc')}><Piece type={!piece ? null : piece?.type} /></div>
    )
}

export default Square