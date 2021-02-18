import React from 'react'
import {NextPage} from 'next'
import Head from 'next/head'
import HexGame from '../components/HexGame'

const IndexPage: NextPage = () => {
	return (
		<>
            <Head>
                <title>Hex puzzle game</title>
            </Head>
			<HexGame/>
		</>
	)
}

export default IndexPage