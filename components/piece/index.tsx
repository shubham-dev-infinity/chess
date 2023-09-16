'use client'
import Image from 'next/image';
import React from 'react'


const whitePieceImageMap: Record<string, string> = {
    'pawn': '/pieces/pawn.png',
    'knight': '/pieces/knight.png',
    'bishop': '/pieces/bishop.png',
    'rock': '/pieces/rock.png',
    'king': '/pieces/king.png',
    'queen': '/pieces/queen.png',
}

const blackPieceImageMap: Record<string, string> = {
    'pawn': '/pieces/blackPwan.png',
    'knight': '/pieces/blackKnight.png',
    'bishop': '/pieces/blackBishop.png',
    'rock': '/pieces/blackRock.png',
    'king': '/pieces/blackKing.png',
    'queen': '/pieces/blackQueen.png',
}
const Piece = ({ type, color }: { type: string | null, color?: string }) => {
    if (!type) {
        return null;
    }
    return (
        <>
            <Image src={color==='white' ?  whitePieceImageMap[type] : blackPieceImageMap[type]} alt={type} width={50} height={50} />
        </>
    )
}

export default Piece