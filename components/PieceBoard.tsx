import React, {FC, ReactElement, useEffect, useState} from 'react'
import { BlockInfo, GameBoardInfo } from '../common/GameBoardInfo'
import styles from '../styles/GameBoard.module.scss'
import useDimensions from 'react-cool-dimensions'
import { BlockPiece } from '../common/BlockPiece'
import Block from './Block'

export interface PieceBoardProps {
    piece: BlockPiece
}

function makeBlock(screenWidth: number, screenHeight: number, block: BlockInfo | null): ReactElement {
    if(!block)
        return null

    return (
        <Block key={`${block.w}:${block.z}`} width={block.blockWidth * screenWidth} height={block.blockHeight * screenHeight} top={block.y * screenHeight} left={block.x * screenWidth} color={block.isEmpty ? '#FFFFFF' : '#13AE67'}/>
    )
}

const PieceBoard: FC<PieceBoardProps> = ({ piece }) => {
    const [gameBoardInfo, setGameBoardInfo] = useState(() => new GameBoardInfo().init(piece.pieceSize))
    const {ref: boardRef, width, height} = useDimensions<HTMLDivElement>()

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