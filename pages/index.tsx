import React from 'react'
import {NextPage} from 'next'
import GameBoard from '../components/GameBoard'
import Head from 'next/head'

const IndexPage: NextPage = () => {
	return (
		<>
            <Head>
                <title>Hex puzzle game</title>
            </Head>
			<GameBoard boardSize={5}/>
		</>
	)
}

export default IndexPage