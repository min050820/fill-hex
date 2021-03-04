import React, {FC, useEffect, useState} from 'react'
import {GameBoardInfo} from '../common/GameBoardInfo'
import Block from './Block'
import useDimensions from 'react-cool-dimensions'
import { PieceData } from '../common/PieceData'
import { IRenderContext } from './GameBoard'


export interface BlockBoardProps {
    inputEnabled?: boolean
    onClick?: (w: number, z: number) => void
    onHover?: (w: number, z: number) => void
    onHoverEnd?: () => void
    
    updateRenderInfo?: (renderInfo: Partial<IRenderContext>) => void

    className: string
    boardInfo: GameBoardInfo
    ghost?: PieceData
}


type Coord = {w: number, z: number}


function clipByValue(value: number, min: number, max: number) {
    return Math.max(Math.min(value, max), min)
}

const BlockBoard: FC<BlockBoardProps> = (props) => {
    const {inputEnabled} = props
    const {onClick, onHover, onHoverEnd} = props
    const {className, boardInfo, ghost} = props
    const {updateRenderInfo} = props

    const [hoverCoord, setHoverCoord] = useState<Coord | null>(null)
    const {ref, width, height} = useDimensions<HTMLDivElement>()

    useEffect(() => {
        if(hoverCoord && onHover)
            onHover(hoverCoord.w, hoverCoord.z)
        else if(onHoverEnd)
            onHoverEnd()
    }, [hoverCoord])

    useEffect(() => {
        updateRenderInfo && updateRenderInfo({ blockWidth: width * boardInfo.blockWidth, blockHeight: height * boardInfo.blockHeight })
    }, [width, height])

    const onPointerMove = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(!ref.current || ev.target === ref.current) {
            setHoverCoord(() => null)
            return false
        }
        
        const boardDiv = ref.current
        const rect = boardDiv.getBoundingClientRect()
        const x = clipByValue((ev.clientX - rect.left) / rect.width, 0, 1)
        const y = clipByValue((ev.clientY - rect.top) / rect.height, 0, 1)

        let minIndex = -1
        let minDist = 1
        for(let i = 0; i < boardInfo.blocks.length; i++) {
            const block = boardInfo.blocks[i]
            if(!block)
                continue
            const blockX = block.x + boardInfo.blockWidth / 2
            const blockY = block.y + boardInfo.blockHeight / 2
            const dist = (x - blockX) * (x - blockX) + (y - blockY) * (y - blockY)
            if(dist < minDist) {
                minIndex = i
                minDist = dist
            }
        }

        const result = boardInfo.blocks[minIndex] ?? {w: 0, z: 0}
        setHoverCoord((prev) => {
            if(!prev || prev.w !== result.w || prev.z !== result.z)
                return {w: result.w, z: result.z}
            else
                return prev
        })
    }

    const onPointerLeave = () => {
        setHoverCoord(() => null)
    }

    return (
        <div ref={ref} className={className}
            onClick={(inputEnabled && onClick) ? (() => {hoverCoord && onClick(hoverCoord.w, hoverCoord.z)}) : undefined}
            onPointerMove={inputEnabled ? onPointerMove : undefined}
            onPointerLeave={inputEnabled ? onPointerLeave : undefined}>
            
            {boardInfo.blocks.map((a) => a && <Block key={`${a.w}:${a.z}`}
                    height={height * boardInfo.blockHeight} width={width * boardInfo.blockWidth}
                    top={height * a.y} left={width * a.x}
                    ghost={(hoverCoord && ghost?.pick(a.w - hoverCoord.w, a.z - hoverCoord.z)) ?? false}
                    block={a}/>)}
        </div>
    )
}

export default BlockBoard