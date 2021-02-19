import React, {FC, useState} from 'react'
import { BlockPiece } from '../common/BlockPiece'
import { GameBoardInfo } from '../common/GameBoardInfo'
import styles from '../styles/GameBoard.module.scss'
import BlockBoard from './BlockBoard'


export interface GameBoardProps {
    boardSize: number
}


const GameBoard: FC<GameBoardProps> = ({boardSize}) => {
    const [gameBoardInfo, setGameBoardInfo] = useState(() => new GameBoardInfo().init(boardSize))
    const [displayGhost, setDisplayGhost] = useState(false)

    const currPiece = new BlockPiece(1, [true])

    const onClick = (w: number, z: number) => {
        setGameBoardInfo((board) => {
            if(!board.testPiece(currPiece, w, z))
                return board
            board = board.placePiece(currPiece, w, z)
            board = board.checkBingo()
            return board
        })
    }

    // FIXME: Ghost piece should be centered
    return (
        <BlockBoard
            className={styles.board}
            blocks={gameBoardInfo.blocks}
            inputEnabled
            onHover={(w, z) => setDisplayGhost(gameBoardInfo.testPiece(currPiece, w, z))}
            onHoverEnd={() => setDisplayGhost(false)}
            onClick={onClick}
            ghost={displayGhost ? currPiece : undefined}/>
    )
}

export default GameBoard