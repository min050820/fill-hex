import React, {FC, ReactElement, useEffect, useRef, useState} from 'react'
import { BlockInfo, GameBoardInfo } from '../common/GameBoardInfo'
import styles from '../styles/GameBoard.module.scss'
import useDimensions from 'react-cool-dimensions'
import { getTestPiece1 } from '../common/BlockPiece'

export interface GameBoardProps {
    boardSize: number
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

const GameBoard: FC<GameBoardProps> = ({boardSize}) => {
    const [gameBoardInfo, setGameBoardInfo] = useState(() => new GameBoardInfo().init(boardSize))
    const {ref: boardRef, width, height} = useDimensions<HTMLDivElement>()
    const refW = useRef<HTMLInputElement>()
    const refZ = useRef<HTMLInputElement>()

    const onClickPlace = () => {
        const w = Number.parseInt(refW.current.value)
        const z = Number.parseInt(refZ.current.value)
        
        setGameBoardInfo((prev) => {
            prev = prev.placePiece(getTestPiece1(), w, z)
            prev = prev.checkBingo()
            return prev
        })
    }

    return (
        <>
            <div ref={boardRef} className={styles.board}>
                {gameBoardInfo.blocks.map((a) => makeBlock(width, height, a))}
            </div>
            <div className={styles.selector}>
                W: <input ref={refW} type="number"/>
                &nbsp; Z: <input ref={refZ} type="number"/>
                &nbsp; <button onClick={onClickPlace}>Place!</button>
            </div>
        </>
    )
}

export default GameBoard