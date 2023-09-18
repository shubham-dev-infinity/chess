import { chessBoardProps, piecesType } from '@/types'
import getChessBoard from '@/utils/chessboard.util'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



interface stateProps {
    chessBoard: chessBoardProps;
    activePaths: number[][];
    activePiecePosition: number[];
    whoseMove: 'white' | 'black';
}

const initialState: stateProps = { chessBoard: getChessBoard(), activePaths: [], activePiecePosition: [-1,-1], whoseMove: 'white' }


export const chessBoardSlice = createSlice({
    name: 'chessBoard',
    initialState,
    reducers: {
        makeMove: (state, action: PayloadAction<{ chessBoard: chessBoardProps }>) => {
            state.chessBoard = action.payload.chessBoard
            state.whoseMove = state.whoseMove === 'white' ? 'black' : 'white';
        },
        setActivePathsWithPiece: (state, action: PayloadAction<{ activePaths: number[][], activePiecePosition: number[] }>) => {
            console.log(action.payload.activePiecePosition,'active')
            state.activePaths = action.payload.activePaths
            state.activePiecePosition = action.payload.activePiecePosition
        },
    }
})

export const { makeMove, setActivePathsWithPiece } = chessBoardSlice.actions


export default chessBoardSlice.reducer

