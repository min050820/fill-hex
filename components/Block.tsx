import React, {FC} from 'react'
import styles from '../styles/Block.module.scss'

export interface BlockProps {
    color?: string
    width: number
    height: number
    top: number
    left: number
}

//FIXME: Currently has a subpixel error which was not found in <div> version.
const BlockFC: FC<BlockProps> = (prop) => {
    // https://stackoverflow.com/questions/7241393/can-you-control-how-an-svgs-stroke-width-is-drawn
    // https://codepen.io/wvr/pen/WrNgJp
    return (
        <>
            <svg style={{
                position: 'absolute',
                fill: (prop.color ?? '#FFFFFF'),
                width: `${prop.width}px`,
                height: `${prop.height}px`,
                top: `${prop.top}px`,
                left: `${prop.left}px`,
                }} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 259.8076211353316 300' version='1.1' xmlnsXlink='http://www.w3.org/1999/xlink'>
                <path fill={prop.color ?? '#fff'} 
                d='M112.58330249197702 9.999999999999998Q129.9038105676658 0 147.22431864335456 9.999999999999998L242.48711305964284 65Q259.8076211353316 75 259.8076211353316 95L259.8076211353316 205Q259.8076211353316 225 242.48711305964284 235L147.22431864335456 290Q129.9038105676658 300 112.58330249197702 290L17.320508075688775 235Q0 225 0 205L0 95Q0 75 17.320508075688775 65Z'
                stroke="#000000" stroke-width="5px"
                id='ld' clipPath='url(#clip)'
                ></path>
                <clipPath id='clip'><use xlinkHref='#ld'/></clipPath>
            </svg>
        </>
    )
    // Below is a hexagon without round
    /*
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="260" height="300" viewbox="0 0 259.8076211353316 300" style="filter: drop-shadow(0px 0px 0px);"><path fill="#fff" d='M129.9038105676658 0L259.8076211353316 75L259.8076211353316 225L129.9038105676658 300L0 225L0 75Z'></path></svg>
    */
}

export default BlockFC