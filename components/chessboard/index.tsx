'ues client'
import React, { memo } from 'react'
import Square from '../square';
import styles from './styles.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '@/store';
import { cloneTheBoard } from '@/utils/chessboard.util';


// import { chessBoardProps } from '@/types';

const ChessBoard = () => {
    const chessBoard_ = cloneTheBoard(useSelector((state: RootState) => state.chessBoard.chessBoard)
)

    function prepareChessBoard() {
        const preparedChessBoard: any[] = new Array();   //need to work here as any type is not good practice while using typescript
        const row_: number = 8;
        const column_: number = 8;

        //this loop is for initialize second variable of board because of we need to retuen UI
        for (let row = 0; row < row_; row++) {
            preparedChessBoard[row] = new Array(8).fill(null)
        }

        for (let i = 0; i < row_; i++) {
            for (let j = 0; j < column_; j++) {
                const color_ = (i + j) % 2 === 0 ? 'white' : 'black';
                preparedChessBoard[i][j] = <Square key={i.toString() + j.toString()} row={i} column={j} piece={chessBoard_[i][j]} color={color_} className={color_ === 'black' ? styles.grid_Cell_Black : styles.grid_Cell_White} chessBoard={chessBoard_} />
            }
        }
        return preparedChessBoard;      
    }
    return (
        <>
            <div className={styles.grid_Container}>
                {prepareChessBoard()}
            </div>
        </>
    )
}

export default memo(ChessBoard)