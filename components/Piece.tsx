import React, { FC } from 'react'
import { PieceInfo } from '../common/PieceData'
import Block from '../components/Block'
import { IRenderContext, RenderContext } from './GameBoard'
import useDimensions from 'react-cool-dimensions'

export interface PieceProps {
    piece: PieceInfo
}

const Piece: FC<PieceProps> = ({ piece }) => {
    const renderInfo = React.useContext<IRenderContext>(RenderContext)
    
    const {ref, width, height} = useDimensions<HTMLDivElement>()

    const rectsize = Math.min(width, height)

    return (
        <div style={{ width: '100%', height: '100%' }} ref={ref}>
            <div style={{ width: `${rectsize}px`, height: `${rectsize}px`, position: 'relative', margin: '0 auto' }}>
                {piece.blocks.map((a, i) => a && <Block key={`b${i}`}
                    height={renderInfo.blockHeight} width={renderInfo.blockWidth}
                    top={rectsize * a.y} left={rectsize * a.x}
                    ghost={false}
                    block={a}/>)}
            </div>
        </div>
    )
}

export default Piece