import React from 'react'
import {NextPage} from 'next'
import Head from 'next/head'
import GameBoard from '../components/GameBoard'

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