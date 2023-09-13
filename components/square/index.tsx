'use client'

import React from 'react'
import Piece from '../piece';
import styles from './styles.module.scss'
import { chessBoardProps, piecesType } from '@/types';
import { useDispatch } from 'react-redux'
import { makeMove } from '@/store/chessboard-context/chessBoardSlice';

interface squareProps {
    color: string;
    piece: piecesType | null;
    chessBoard: chessBoardProps;
    className?: string;
}

const Square = (args: squareProps) => {
    const { className, piece, chessBoard } = args
    const dispatch = useDispatch()


    const makeMoveOnClick = (piecs: piecesType | null) => {
        const possiblepaths = piece?.possiblePath(chessBoard)
        console.log(chessBoard, 'ps path')
        if (possiblepaths) {
            dispatch(makeMove({ chessBoard: piece?.makeMove(Object.assign({}, chessBoard), possiblepaths[0][0], possiblepaths[0][1]) }))
        }
    }

    return (
        <div className={`${className} ${styles.piece_Wrapper}`} onClick={() => makeMoveOnClick(piece)}><Piece type={!piece ? null : piece?.type} /></div>
    )
}

export default Square