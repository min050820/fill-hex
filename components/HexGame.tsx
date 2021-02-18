import { FC } from 'react'
import GameBoard from './GameBoard'
import PieceBagBoard from './PieceBagBoard'

const HexGame: FC = () => {
    return (
        <>
            <GameBoard boardSize={5}/>
            <PieceBagBoard/>
        </>
    )
}

export default HexGame