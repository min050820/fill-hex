import { BlockPiece, getPieces } from './BlockPiece'
import Random from './Random'

const piecePool = [...getPieces(4), ...getPieces(1)]

function nextPiece(generator: Random): BlockPiece {
    const poolSize = piecePool.length
    
    return piecePool[generator.nextInt(poolSize)]
}

class PieceBag {
    random: Random
    bagSize: number
    bag: Array<BlockPiece>

    constructor(size: number, seed?: number) {
        if(seed) {
            this.random = new Random(seed)
        } else {
            const rseed = Date.now() / 10
            this.random = new Random(rseed)
        }
        this.bagSize = size
        this.bag = new Array<BlockPiece>()

        for(let i = 0; i < size; i++) {
            this.bag.push(nextPiece(this.random))
        }
    }

    use(index: number): BlockPiece {
        if(index > 0 || index >= this.bagSize) {
            throw 'PieceBag: use() index not in range'
        }

        return this.bag.splice(index, 1, nextPiece(this.random))[0]
    }

    *[Symbol.iterator](): IterableIterator<BlockPiece> {
        for(let i = 0; i < this.bagSize; i++) {
            yield this.bag[i]
        }
    }
}

export default PieceBag