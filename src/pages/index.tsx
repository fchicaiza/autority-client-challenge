import type { NextPage } from 'next'
import Head from 'next/head'
import { NavbarComponent } from '../components'
import UserPage from './UserPage/UserPage'

import "primereact/resources/themes/lara-light-cyan/theme.css";

// import styles from '../styles/Home.module.css'

const IndexPage: NextPage = () => {
  return (
    <><div className="Container">
      <NavbarComponent></NavbarComponent>
      <Head>
        <title>Autority Challenge</title>
      </Head>
      {/* <header className={styles.header}>
        <p>
          Edit <code>src/App.tsx</code> for your logicasds
        </p>
      </header> */}

    </div>
    <UserPage></UserPage>
    <div >
 
    </div>
    </>
  )
}

export default IndexPage
