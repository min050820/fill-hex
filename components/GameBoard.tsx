import React, {FC, useState} from 'react'
import { PieceData } from '../common/PieceData'
import { GameBoardInfo } from '../common/GameBoardInfo'
import PieceBag from '../common/PieceBag'
import styles from '../styles/GameBoard.module.scss'
import BlockBoard from './BlockBoard'
import PieceBagBoard from './PieceBagBoard'

export interface GameBoardProps {
    boardSize: number
}

export interface IRenderContext {
    blockWidth: number
    blockHeight: number
}

export const RenderContext = React.createContext<IRenderContext>({ blockWidth: 0, blockHeight: 0 })


const GameBoard: FC<GameBoardProps> = ({boardSize}) => {
    const [gameBoardInfo, setGameBoardInfo] = useState(() => new GameBoardInfo().init(boardSize))
    const [pieceBag, ] = useState(() => new PieceBag().init(3))
    const [displayGhost, setDisplayGhost] = useState(false)

    const [renderInfo, setRenderInfo] = useState<IRenderContext>({ blockWidth: 0, blockHeight: 0 })

    const currPiece = new PieceData(1, [true])

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
        <RenderContext.Provider value={renderInfo}>
            <div className={styles.container}>
                <BlockBoard
                    className={styles.board}
                    boardInfo={gameBoardInfo}
                    inputEnabled
                    onHover={(w, z) => setDisplayGhost(gameBoardInfo.testPiece(currPiece, w, z))}
                    onHoverEnd={() => setDisplayGhost(false)}
                    onClick={onClick}
                    ghost={displayGhost ? currPiece : undefined}
                    updateRenderInfo={ri => {setRenderInfo({...renderInfo, ...ri})}}/>
                <PieceBagBoard
                    className={styles.piecebag}
                    pieceBag={pieceBag}
                    inputEnabled            
                />
            </div>
        </RenderContext.Provider>
    )
}

export default GameBoard