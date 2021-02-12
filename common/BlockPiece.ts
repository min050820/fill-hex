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
        return this.blockData[w + z * this.getAxisBound()]
    }
}

export function getTestPiece1(): BlockPiece {
    return new BlockPiece(1, [true])
}

export function getTestPiece2(): BlockPiece {
    return new BlockPiece(2, [false, true, false, false, false, true, false, true, true])
}
