import React from 'react'
import {NextPage} from 'next'
import GameBoard from '../components/GameBoard'

const IndexPage: NextPage = () => {
	return (
		<>
			<GameBoard boardSize={5}/>
		</>
	)
}

export default IndexPage