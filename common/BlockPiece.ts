export class BlockPiece {
    pieceSize: number
    blockData: Array<boolean>

    constructor(pieceSize: number, blockData: Array<boolean>) {
        this.pieceSize = pieceSize
        this.blockData = blockData
    }

    getAxisBound(): number {
        return this.pieceSize * 2 - 1
    }

    // returns true if a block is there
    pick(w: number, z: number): boolean {
        if(w < 0 || z < 0 || this.getAxisBound() <= w || this.getAxisBound() <= z)
            return false
        return this.blockData[w + z * this.getAxisBound()]
    }
}

// Convert '01000' -> [false, true, false, false, false]
function convertBinaryToBoolean(binaryString: string): Array<boolean> {
    const result: Array<boolean> = []

    for(let i = 0; i < binaryString.length; i++) {
        switch(binaryString[i]) {
            case '0':
                result.push(false)
                break
            case '1':
                result.push(true)
                break
            default:
                break
        }
    }

    return result
}

// Pieces for Board Size N -> Only use 4 block piece (hard to decide each piece's shape) + 1 block piece
// FIXME: Current shapes doesn't make a good game. Need to change them.
//        ...and what on the earth 'blocks' is supposed to mean?
export function getPieces(blocks: number): Array<BlockPiece> {
    const pieces: Array<BlockPiece> = []

    if(blocks === 1) {
        pieces.push(new BlockPiece(1, [true]))
    } else if(blocks === 4) {
        // Generated using https://scratch.mit.edu/projects/188516027/
        // TYPE: o
        pieces.push(new BlockPiece(1, [true]))
        // TYPE: U
        pieces.push(new BlockPiece(2, convertBinaryToBoolean('110 001 001')))
        pieces.push(new BlockPiece(2, convertBinaryToBoolean('010 001 011')))
        pieces.push(new BlockPiece(2, convertBinaryToBoolean('000 101 011')))
        pieces.push(new BlockPiece(2, convertBinaryToBoolean('100 100 011')))
        pieces.push(new BlockPiece(2, convertBinaryToBoolean('110 100 010')))
        pieces.push(new BlockPiece(2, convertBinaryToBoolean('110 101 000')))
        // TYPE: Block
        pieces.push(new BlockPiece(2, convertBinaryToBoolean('110 011 000')))
        pieces.push(new BlockPiece(2, convertBinaryToBoolean('110 110 000')))
        pieces.push(new BlockPiece(2, convertBinaryToBoolean('100 110 010')))
        // TYPE: b
        pieces.push(new BlockPiece(2, convertBinaryToBoolean('110 010 001')))
        pieces.push(new BlockPiece(2, convertBinaryToBoolean('100 110 001')))
        pieces.push(new BlockPiece(2, convertBinaryToBoolean('100 011 001')))
        pieces.push(new BlockPiece(2, convertBinaryToBoolean('100 010 011')))
        pieces.push(new BlockPiece(2, convertBinaryToBoolean('010 011 010')))
        pieces.push(new BlockPiece(2, convertBinaryToBoolean('010 010 011')))
        pieces.push(new BlockPiece(2, convertBinaryToBoolean('110 010 010')))
        pieces.push(new BlockPiece(2, convertBinaryToBoolean('010 110 010')))
        pieces.push(new BlockPiece(2, convertBinaryToBoolean('010 111 000')))
        pieces.push(new BlockPiece(2, convertBinaryToBoolean('100 111 000')))
        pieces.push(new BlockPiece(2, convertBinaryToBoolean('000 111 001')))
        pieces.push(new BlockPiece(2, convertBinaryToBoolean('000 111 010')))
        // TYPE: long 4
        pieces.push(new BlockPiece(3, convertBinaryToBoolean('01000 00100 00010 00001 00000')))
        pieces.push(new BlockPiece(3, convertBinaryToBoolean('01000 01000 01000 01000 00000')))
        pieces.push(new BlockPiece(3, convertBinaryToBoolean('00000 11110 00000 00000 00000')))
    } else {
        throw `BlockPiece: ${blocks}-block pieces are not supported`
    }

    return pieces
}