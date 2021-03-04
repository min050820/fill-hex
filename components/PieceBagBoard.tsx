import { FC } from 'react'
import PieceBag from '../common/PieceBag'
import Piece from './Piece'
import styles from '../styles/PieceBagBoard.module.scss'

export interface PieceBagBoardProps {
    inputEnabled?: boolean
    onClick?: (w: number, z: number) => void
    onHover?: (w: number, z: number) => void
    onHoverEnd?: () => void

    className: string
    pieceBag: PieceBag

    hideIndex?: number
}

const PieceBagBoard: FC<PieceBagBoardProps> = (props) => {
    const {inputEnabled} = props
    const {onClick, onHover, onHoverEnd} = props
    const {className, pieceBag} = props
    const {hideIndex} = props

    const pieceComponents = []
    for(let i = 0; i < pieceBag.bagSize; i++) {
        pieceComponents.push(
            <div style={i === hideIndex ? {display: 'none'} : {}} key={`${i}`} className={styles.piece}>
                <Piece piece={pieceBag.bag[i]} />
            </div>
        )
    }

    return (
        <div className={className}>
            <div className={styles.filler}>
                {pieceComponents}
            </div>
        </div>
    )
}

export default PieceBagBoard