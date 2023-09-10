export default function getPieceImage(type: string) {
    switch (type) {
        case 'pawn':
            return import('/pieces/pawn.png')
        default:
            return null
    }
}