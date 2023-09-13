import { chessBoardProps } from '@/types'
import getChessBoard from '@/utils/chessboard.util'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



interface stateProps {
    chessBoard: any
}

const initialState: stateProps = { chessBoard: getChessBoard() }


export const chessBoardSlice = createSlice({
    name: 'chessBoard',
    initialState,
    reducers: {
        makeMove: (state, action: PayloadAction<stateProps>) => {
            state.chessBoard = action.payload.chessBoard
        },
    }
})

export const { makeMove } = chessBoardSlice.actions


export default chessBoardSlice.reducer

