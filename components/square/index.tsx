'use client'

import React from 'react'
import Piece from '../piece';
import styles from './styles.module.scss'
import { chessBoardProps, piecesType } from '@/types';
import { useDispatch, useSelector } from 'react-redux'
import { makeMove, setActivePathsWithPiece } from '@/store/chessboard-context/chessBoardSlice';
import { cloneTheBoard } from '@/utils/chessboard.util';
import { RootState } from '@/store';

interface squareProps {
    color: string;
    piece: piecesType | null;
    chessBoard: chessBoardProps;
    row: number;
    column: number;
    className?: string;
}

const Square = (args: squareProps) => {
    const { className, piece, chessBoard, row, column } = args
    const dispatch = useDispatch()
    const activePaths_ = useSelector((state: RootState) => state.chessBoard.activePaths)
    const activePiece_ = useSelector((state: RootState) => state.chessBoard.activePiece)


    const makeMoveOnClick = () => {
        if (piece) {
            if (activePiece_ === piece) return
            const possiblepaths = piece?.possiblePath(chessBoard)
            dispatch(setActivePathsWithPiece({ activePaths: possiblepaths, activePiece: piece }))
        } else {
            // we will check given click square is first avaialbe to move for active piece?
            if (activePaths_.length !== 0) {
                for (let i = 0; i < activePaths_.length; i++) {
                    if (activePaths_[i].includes(row) && activePaths_[i].includes(column)) {
                        let payLoad = activePiece_?.makeMove(cloneTheBoard(chessBoard), row, column)
                        if (payLoad) {
                            dispatch(makeMove({ chessBoard: payLoad }))
                            dispatch(setActivePathsWithPiece({ activePaths: [], activePiece: null }))
                        }
                    }
                }
            }
        }
        console.log(activePiece_)
    }

    return (
        <div className={`${className} ${styles.piece_Wrapper}`} onClick={() => makeMoveOnClick()}><Piece type={!piece ? null : piece?.type} /></div>
    )
}

export default Square