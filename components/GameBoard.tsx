import React, {FC, ReactElement, useEffect, useRef, useState} from 'react'
import { BlockInfo, GameBoardInfo } from '../common/GameBoardInfo'
import styles from '../styles/GameBoard.module.scss'
import useDimensions from 'react-cool-dimensions'
import { getTestPiece1 } from '../common/BlockPiece'
import Block from './Block'

type Coord = [number, number]

export interface GameBoardProps {
    boardSize: number
}

function clipByValue(value: number, min: number, max: number) {
    return Math.max(Math.min(value, max), min)
}

const GameBoard: FC<GameBoardProps> = ({boardSize}) => {
    const [gameBoardInfo, setGameBoardInfo] = useState(() => new GameBoardInfo().init(boardSize))
    const [chosenTile, setChosenTile] = useState<Coord>(null)
    const {ref: boardRef, width, height} = useDimensions<HTMLDivElement>()

    const onMouseMove = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(!boardRef.current || ev.target === boardRef.current) {
            setChosenTile(() => null)
            return false
        }
            
        const boardDiv = boardRef.current
        const rect = boardDiv.getBoundingClientRect()
        const x = clipByValue((ev.clientX - rect.left) / rect.width, 0, 1)
        const y = clipByValue((ev.clientY - rect.top) / rect.height, 0, 1)

        let minIndex = -1
        let minDist = 1
        for(let i = 0; i < gameBoardInfo.blocks.length; i++) {
            const block = gameBoardInfo.blocks[i]
            if(!block)
                continue
            const blockX = block.x + block.blockWidth / 2
            const blockY = block.y + block.blockHeight / 2
            const dist = (x - blockX) * (x - blockX) + (y - blockY) * (y - blockY)
            if(dist < minDist) {
                minIndex = i
                minDist = dist
            }
        }

        setChosenTile(() => [gameBoardInfo.blocks[minIndex].w, gameBoardInfo.blocks[minIndex].z])
    }

    const onMouseLeave = () => {
        setChosenTile(() => null)
        return false
    }

    const onClick = () => {
        if(!chosenTile)
            return false
        const w = chosenTile[0]
        const z = chosenTile[1]
        setGameBoardInfo((board) => {
            // FIXME: mutating board! attention required!!
            board.getBlock(w, z).isEmpty = false
            board = board.checkBingo()
            return board
        })
        return true
    }

    return (
        <>
            <div ref={boardRef} className={styles.board} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} onClick={onClick}>
                {gameBoardInfo.blocks.map((a) => a && <Block key={`${a.w}:${a.z}`}
                    width={width * a.blockWidth} height={height * a.blockHeight}
                    left={width * a.x} top={height * a.y} ghost={chosenTile && (chosenTile[0] === a.w && chosenTile[1] === a.z)}
                    block={a}/>)}
            </div>
        </>
    )
}

export default GameBoard