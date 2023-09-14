import { chessBoardProps, piecesType } from '@/types'
import getChessBoard from '@/utils/chessboard.util'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



interface stateProps {
    chessBoard: chessBoardProps;
    activePaths: number[][];
    activePiece: piecesType | null;
}

const initialState: stateProps = { chessBoard: getChessBoard(), activePaths: [], activePiece: null }


export const chessBoardSlice = createSlice({
    name: 'chessBoard',
    initialState,
    reducers: {
        makeMove: (state, action: PayloadAction<{ chessBoard: chessBoardProps }>) => {
            state.chessBoard = action.payload.chessBoard
        },
        setActivePathsWithPiece: (state, action: PayloadAction<{ activePaths: number[][], activePiece: piecesType | null }>) => {
            state.activePaths = action.payload.activePaths
            state.activePiece = action.payload.activePiece
        },
    }
})

export const { makeMove, setActivePathsWithPiece } = chessBoardSlice.actions


export default chessBoardSlice.reducer

