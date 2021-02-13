import React from 'react'
import {NextPage} from 'next'
import PieceBoard from '../components/PieceBoard'
import { getPieces } from '../common/BlockPiece'

interface PieceType {
    blocks: number
    index: number
}

const PreviewPiecePage: NextPage = () => {
    const [ pieceIdx , setPieceIdx ] = React.useState<PieceType>({ blocks: 4, index: 0 })

    const previewPiece = getPieces(pieceIdx.blocks)[pieceIdx.index]

    const changePiece = (dest: PieceType) => {
        try {
            const tmp = getPieces(dest.blocks)[dest.index]

            if(tmp === undefined || tmp === null) {
                throw 'No such piece found'
            }

            setPieceIdx({...dest})
        } catch (e) {
            // do not change
            console.log(e)
        }
    }

	return (
		<>
			<PieceBoard piece={previewPiece}/>
            <div>
                Blocks: <input type="number" value={pieceIdx.blocks} onChange={(e) => {changePiece({...pieceIdx, blocks: Number.parseInt(e.target.value)})}}/>
                &nbsp; Index: <input type="number" value={pieceIdx.index} onChange={(e) => {changePiece({...pieceIdx, index: Number.parseInt(e.target.value)})}}/>
            </div>
		</>
	)
}

export default PreviewPiecePage