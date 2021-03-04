import { BlockInfo } from './GameBoardInfo'
import { PieceInfo, getPieces, PieceType } from './PieceData'
import Random from './Random'

//TODO: change this to make game 'more playable'
const piecePool = [...getPieces(PieceType.O), ...getPieces(PieceType.U), ...getPieces(PieceType.b), ...getPieces(PieceType.l), ...getPieces(PieceType.o)]

function nextPiece(generator: Random): PieceInfo {
    const poolSize = piecePool.length

    const shape = piecePool[generator.nextInt(poolSize)]
    const blocks: BlockInfo[] = []

    for(const coord of shape) {
        const block: BlockInfo = {
            isEmpty: false, w: coord.w, z: coord.z,
            x: (coord.w + coord.z) / (shape.pieceSize * 4 - 2),
            y: shape.pieceSize === 1 ? 0 : 0.5 - (1 / ((shape.pieceSize * 2 - 1) * Math.sqrt(3))) + (coord.z - coord.w) * ((1 / (shape.pieceSize * 2 - 1)) * Math.sqrt(3) / 2)
        }
        blocks.push(block)
    }
    
    return new PieceInfo(blocks)
}

class PieceBag {
    random: Random
    bagSize: number
    bag: Array<PieceInfo>

    constructor(otherRef?: PieceBag) {
        if(otherRef) {
            this.random = otherRef.random
            this.bagSize = otherRef.bagSize
            this.bag = otherRef.bag
        } else {
            this.random = new Random(0)
            this.bagSize = 0
            this.bag = new Array<PieceInfo>()
        }
    }

    init(size: number, seed?: number): PieceBag {
        if(seed) {
            this.random = new Random(seed)
        } else {
            const rseed = Date.now() / 10
            this.random = new Random(rseed)
        }
        this.bagSize = size

        for(let i = 0; i < size; i++) {
            this.bag.push(nextPiece(this.random))
        }
        return this
    }

    reroll(index: number): PieceBag {
        if(index > 0 || index >= this.bagSize) {
            throw 'PieceBag: use() index not in range'
        }

        const nextState = new PieceBag(this)

        nextState.bag.splice(index, 1, nextPiece(nextState.random))

        return nextState
    }

    *[Symbol.iterator](): IterableIterator<PieceInfo> {
        for(let i = 0; i < this.bagSize; i++) {
            yield this.bag[i]
        }
    }
}

export default PieceBag