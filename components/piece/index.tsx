'use client'
import Image from 'next/image';
import React from 'react'


const pieceImageMap: Record<string, string> = {
    'pawn': '/pieces/pawn.png',
    'knight': '/pieces/knight.png',
    'bishop': '/pieces/bishop.png',
    'rock': '/pieces/rock.png',
    'king': '/pieces/king.png',
    'queen': '/pieces/queen.png',
}
const Piece = ({ type }: { type: string | null }) => {
    if (!type) {
        return null;
    }
    return (
        <>
            <Image src={pieceImageMap[type]} alt={type} width={50} height={50} />
        </>
    )
}

export default Piece