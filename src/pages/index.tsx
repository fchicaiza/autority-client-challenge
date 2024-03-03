import type { NextPage } from 'next'
import Head from 'next/head'
import { NavbarComponent } from '../components'
import UserPage from './UserPage/UserPage'

import styles from '../styles/Home.module.css'

const IndexPage: NextPage = () => {
  return (
    <><div className={styles.container}>
      <NavbarComponent></NavbarComponent>
      <UserPage></UserPage>
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

export default IndexPage
