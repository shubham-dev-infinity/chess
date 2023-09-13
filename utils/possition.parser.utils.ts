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

export function possitionParserToStandardPosition(row: number, column: number): string {
    let position_row: string = ''
    let position_Column: string = ''

    //column position parsing
    switch (row) {
        case 0:
            position_row = '8'
            break
        case 1:
            position_row = '7'
            break
        case 2:
            position_row = '6'
            break
        case 3:
            position_row = '5'
            break
        case 4:
            position_row = '4'
            break
        case 5:
            position_row = '3'
            break
        case 6:
            position_row = '2'
            break
        case 7:
            position_row = '1'
            break
    }

    switch (column) {
        case 0:
            position_Column = 'a'
            break
        case 1:
            position_Column = 'b'
            break
        case 2:
            position_Column = 'c'
            break
        case 3:
            position_Column = 'd'
            break
        case 4:
            position_Column = 'e'
            break
        case 5:
            position_Column = 'f'
            break
        case 6:
            position_Column = 'g'
            break
        case 7:
            position_Column = 'h'
            break
    }

    return position_Column + position_row
}