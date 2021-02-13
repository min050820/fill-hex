import React, {FC, ReactElement, useEffect, useRef, useState} from 'react'
import { BlockInfo, GameBoardInfo } from '../common/GameBoardInfo'
import styles from '../styles/GameBoard.module.scss'
import useDimensions from 'react-cool-dimensions'
import { getTestPiece1 } from '../common/BlockPiece'
import Block from './Block'

export interface GameBoardProps {
    boardSize: number
}

function makeBlock_svg(screenWidth: number, screenHeight: number, block: BlockInfo | null): ReactElement {
    if(!block)
        return null

    return (
        <Block key={`${block.w}:${block.z}`} useSVG
        width={block.blockWidth * screenWidth} height={block.blockHeight * screenHeight}
        top={block.y * screenHeight} left={block.x * screenWidth}
        color={block.isEmpty ? '#FFFFFF' : '#13AE67'}/>
    )
}
function makeBlock_div(screenWidth: number, screenHeight: number, block: BlockInfo | null): ReactElement {
    if(!block)
        return null

    return (
        <Block key={`${block.w}:${block.z}`}
        width={block.blockWidth * screenWidth} height={block.blockHeight * screenHeight}
        top={block.y * screenHeight} left={block.x * screenWidth}
        fileSuffix={block.isEmpty ? 'white' : 'filled'}/>
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
                {gameBoardInfo.blocks.map((a) => makeBlock_div(width, height, a))}
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