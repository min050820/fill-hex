import React, {FC, ReactElement, useEffect, useRef, useState} from 'react'
import { BlockInfo, GameBoardInfo } from '../common/GameBoardInfo'
import styles from '../styles/GameBoard.module.scss'
import useDimensions from 'react-cool-dimensions'
import { BlockPiece } from '../common/BlockPiece'

export interface PieceBoardProps {
    piece: BlockPiece
}

function makeBlock(screenWidth: number, screenHeight: number, block: BlockInfo | null): ReactElement {
    if(!block)
        return null

    return (
        <div key={`${block.z}:${block.w}`}
            className={`${styles.block} ${block.isEmpty ? styles.empty : styles.filled}`}
            style={{
                height: `${block.blockHeight * screenHeight}px`,
                width: `${block.blockWidth * screenWidth}px`,
                top: `${block.y * screenHeight}px`,
                left: `${block.x * screenWidth}px`}}/>
    )
}

const PieceBoard: FC<PieceBoardProps> = ({ piece }) => {
    const [gameBoardInfo, setGameBoardInfo] = useState(() => new GameBoardInfo().init(piece.pieceSize))
    const {ref: boardRef, width, height} = useDimensions<HTMLDivElement>()
    const refW = useRef<HTMLInputElement>()
    const refZ = useRef<HTMLInputElement>()

    useEffect(() => {
        setGameBoardInfo(() => new GameBoardInfo().init(piece.pieceSize).placePiece(piece, 0, 0))
    }, [piece])

    return (
        <>
            <div ref={boardRef} className={styles.board}>
                {gameBoardInfo.blocks.map((a) => makeBlock(width, height, a))}
            </div>
        </>
    )
}

export default PieceBoard