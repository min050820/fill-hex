import { BlockPiece, getTestPiece1 } from './BlockPiece'

export interface BlockInfo {
    isEmpty: boolean

    // rendering info (0..1)
    x: number
    y: number
    blockWidth: number
    blockHeight: number

    // block axis ↗ (counting from 0)
    w: number
    // block axis ↘
    z: number
}

// immutable!
export class GameBoardInfo {
    boardSize: number  //< Count of blocks in one edge
    blocks: Array<BlockInfo | null>

    constructor(otherRef: GameBoardInfo | undefined) {
        if(otherRef) {
            // copy constructor
            this.boardSize = otherRef.boardSize
            this.blocks = otherRef.blocks
        } else {
            this.boardSize = 0
            this.blocks = []
        }
    }

    init(boardSize: number): GameBoardInfo {
        boardSize |= 0
        this.boardSize = boardSize
        this.blocks = []
        const blockWidth = 1 / (boardSize * 2 - 1)
        const blockHeight = blockWidth * 2 / Math.sqrt(3)
        const blockOffsetX = blockWidth / 2
        const blockOffsetY = blockWidth * Math.sqrt(3) / 2

        let x = 0
        let y = 0.5 - blockHeight / 2

        for(let z = 0; z < this.getAxisBound(); z++) {
            let offsetX = 0
            let offsetY = 0
            for(let w = 0; w < this.getAxisBound(); w++) {
                if(this.testPosition(w, z)) {
                    this.blocks.push({
                        isEmpty: true,
                        x: x + offsetX,
                        y: y + offsetY,
                        blockWidth: blockWidth,
                        blockHeight: blockHeight,
                        w, z
                    })
                } else {
                    this.blocks.push(null)
                }
                offsetX += blockOffsetX
                offsetY -= blockOffsetY
            }
            x += blockOffsetX
            y += blockOffsetY
        }

        return this
    }

    // 0 <= w, z < getWBound()
    getAxisBound(): number {
        return this.boardSize * 2 - 1
    }

    // not non-null if used with testPosition(w, z)
    getBlock(w: number, z: number): BlockInfo {
        return this.blocks[z * this.getAxisBound() + w]!
    }

    // test if (w, z) is not padding area
    testPosition(w: number, z: number): boolean {
        if(z < 0 || this.getAxisBound() <= z)
            return false
        if(z < this.boardSize)
            return (0 <= w) && (w < z + this.boardSize)
        return (z - this.boardSize < w) && (w < this.getAxisBound())
    }

    // test if a piece can fit into (tw, tz)
    testPiece(piece: BlockPiece, tw: number, tz: number): boolean {
        const bound = piece.getAxisBound()

        for(let cz = 0; cz < bound; cz++) {
            for(let cw = 0; cw < bound; cw++) {
                if(piece.pick(cw, cz)) {
                    if(this.testPosition(tw + cw, tz + cz)) {
                        if(!this.getBlock(tw + cw, tz + cz).isEmpty) {
                            return false
                        }
                    } else {
                        return false
                    }
                }
            }
        }

        return true
    }

    // place piece
    placePiece(piece: BlockPiece, tw: number, tz: number): GameBoardInfo {
        const ret = new GameBoardInfo(this)
        
        if(!ret.testPiece(piece, tw, tz)) {
            throw 'Unable to place block!'
        }

        // place
        const pieceBound = piece.getAxisBound()

        for(let cz = 0; cz < pieceBound; cz++) {
            for(let cw = 0; cw < pieceBound; cw++) {
                if(piece.pick(cw, cz)) {
                    ret.getBlock(cw + tw, cz + tz).isEmpty = false
                }
            }
        }

        return ret
    }

    checkBingo(): GameBoardInfo {
        const ret = new GameBoardInfo(this)

        // bingo: ---
        const traverseTypeA = [1, 1]
        // bingo: ///
        const traverseTypeB = [1, 0]
        // bingo: \\\
        const traverseTypeC = [0, 1]
        const traverseTypes = [traverseTypeA, traverseTypeB, traverseTypeC]

        const reduceLine = <T extends unknown>(offset: [number, number], w: number, z: number, cb: (prev: T | null, w: number, z: number) => T): T | null => {
            const [offsetW, offsetZ] = offset
            let value = null
            while(ret.testPosition(w, z)) {
                value = cb(value, w, z)
                w += offsetW
                z += offsetZ
            }
            return value
        }

        const hits: Array<{traverse: [number, number], w: number, z: number}> = []

        for(let i = 0; i < traverseTypes.length; i++) {
            const [offsetW, offsetZ] = traverseTypes[i]
            for(let z = 0; z < ret.getAxisBound(); z++) {
                for(let w = 0; w < ret.getAxisBound(); w++) {
                    if(!ret.testPosition(w, z))
                        continue
                    if(ret.testPosition(w - offsetW, z - offsetZ))
                        continue
                    // check bingo
                    const hasBingo = reduceLine(traverseTypes[i], w, z, (prev: boolean, w, z) => {
                        if(ret.getBlock(w, z).isEmpty)
                            return false
                        return (prev !== null ? prev : true)
                    })
                    if(hasBingo) {
                        hits.push({traverse: traverseTypes[i], w, z})
                    }
                }
            }
        }

        for(let i = 0; i < hits.length; i++) {
            reduceLine(hits[i].traverse, hits[i].w, hits[i].z, (prev: null, w, z) => {
                ret.getBlock(w, z).isEmpty = true
            })
        }

        return ret
    }
}