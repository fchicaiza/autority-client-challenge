import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import styles from '../styles/Home.module.css'
export const HomePage = () => {
    return (
        <><div className={styles.container}>

            <Head>
                <title>Autority Challenge</title>
            </Head>
            <header className={styles.header}>
                <p>
                    Edit <code>src/App.tsx</code> for your logicasds
                </p>
            </header>

        </div></>
    )
}

export default HomePage