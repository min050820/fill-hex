import React, {FC} from 'react'
import styles from '../styles/Block.module.scss'
import {BlockInfo} from '../common/GameBoardInfo'

export interface BlockProps {
    width: number
    height: number
    top: number
    left: number
    block: BlockInfo
    ghost: boolean
}

//FIXME: Currently <svg> version has a subpixel error which was not found in <div> version
const Block: FC<BlockProps> = ({width, height, top, left, block, ghost}) => {
    return (
        <div className={`${styles.block} ${block.isEmpty ? (ghost ? styles.ghost : styles.white) : styles.filled}`}
            style={{
                height: `${height}px`,
                width: `${width}px`,
                top: `${top}px`,
                left: `${left}px`
            }}>
        </div>
    )
}

export default Block