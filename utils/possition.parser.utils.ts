export function possitionParser(column: string, row: string): [number, number] {
    let position_Row: number
    let position_Column: number
    //row position parsing
    switch (column) {
        case 'a':
            position_Column = 0
            break;
        case 'b':
            position_Column = 1
            break;
        case 'c':
            position_Column = 2
            break;
        case 'd':
            position_Column = 3
            break;
        case 'e':
            position_Column = 4
            break;
        case 'f':
            position_Column = 5
            break;
        case 'g':
            position_Column = 6
            break;
        case 'h':
            position_Column = 7
            break;
        default:
            position_Column = -1
            break
    }

    //column position parsing
    switch (row) {
        case '1':
            position_Row = 7
            break
        case '2':
            position_Row = 6
            break
        case '3':
            position_Row = 5
            break
        case '4':
            position_Row = 4
            break
        case '5':
            position_Row = 3
            break
        case '6':
            position_Row = 2
            break
        case '7':
            position_Row = 1
            break
        case '8':
            position_Row = 0
            break
        default:
            position_Row = -1
    }

    return [position_Row, position_Column]

}