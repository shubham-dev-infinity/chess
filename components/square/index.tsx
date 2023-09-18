'use client'

import React from 'react'
import Piece from '../piece';
import styles from './styles.module.scss'
import { chessBoardProps, piecesType } from '@/types';
import { useDispatch, useSelector } from 'react-redux'
import { makeMove, setActivePathsWithPiece } from '@/store/chessboard-context/chessBoardSlice';
import { cloneTheBoard } from '@/utils/chessboard.util';
import { RootState } from '@/store';
import { findPossiblePaths, movePiece } from '@/utils/board.move.util';

interface squareProps {
    color: string;
    piece: piecesType | null;
    chessBoard: chessBoardProps;
    row: number;
    column: number;
    className?: string;
}

const Square = (args: squareProps) => {
    const { className, piece, row, column } = args

    const chessBoard = cloneTheBoard(useSelector((state: RootState) => state.chessBoard.chessBoard))
    const whoseMove = useSelector((state: RootState) => state.chessBoard.whoseMove)

    const dispatch = useDispatch()
    const activePaths_ = useSelector((state: RootState) => state.chessBoard.activePaths)
    const [activePieceRowPosition_, activePieceColumnPosition_] = useSelector((state: RootState) => state.chessBoard.activePiecePosition)


    console.log(chessBoard, 'chess')
    const makeMoveOnClick = () => {
        console.log(activePieceColumnPosition_, activePieceRowPosition_, 'pos')

        const activePiece = (activePieceRowPosition_ === -1 && activePieceColumnPosition_ === -1) ? null : chessBoard[activePieceRowPosition_][activePieceColumnPosition_]

        if (!piece && activePaths_.length === 0) return; // if you click out any empty box without selecting piece then this function will do nothing

        if (piece && piece?.color !== whoseMove && activePaths_.length ===0) {
            alert(whoseMove + "'s move")
            return;
        }


        if (piece && activePaths_.length === 0) {
            //ok we get click on piece , which
            // if (activePiecePosition_.length === 0) return
            const possiblepaths = findPossiblePaths(chessBoard, piece)
            dispatch(setActivePathsWithPiece({ activePaths: possiblepaths, activePiecePosition: [row, column] }))
            console.log(possiblepaths, 'ps')
        } else {
            // we will check given click square is first avaialbe to move for active piece?
            if (activePaths_.length !== 0) {
                if (isInclude()) {
                    let payLoad = movePiece(chessBoard, activePiece, row, column)
                    if (payLoad) {
                        dispatch(makeMove({ chessBoard: payLoad }))
                        dispatch(setActivePathsWithPiece({ activePaths: [], activePiecePosition: [-1, -1] }))
                    }
                }
            }
        }
    }

    const isInclude = (): boolean => {
        for (let i = 0; i < activePaths_.length; i++) {
            if (activePaths_[i][0] === row && activePaths_[i][1] === column) {
                return true
            }
        }
        return false;
    }

    return (
        <div className={`${className} ${styles.piece_Wrapper}`} onClick={() => makeMoveOnClick()} draggable onDragStart={()=> makeMoveOnClick()} onDrop={() => makeMoveOnClick()} onDragOver={(e) => e.preventDefault()}>
            <div className={isInclude() ? styles.activePath : ''} />
            <Piece type={!piece ? null : piece?.type} color={piece?.color} />
        </div>
    )
}

export default Square