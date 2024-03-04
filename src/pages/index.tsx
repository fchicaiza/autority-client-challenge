import type { NextPage } from 'next'
import Head from 'next/head'
import { NavbarComponent } from '../components'

import styles from '../styles/Home.module.css'

const IndexPage: NextPage = () => {
  return (
    <><div className="Container">
      <NavbarComponent></NavbarComponent>
      <Head>
        <title>Autority Challenge</title>
      </Head>
      <header className={styles.header}>
        <p>
          Abre el menú para acceder a los CRUDS, debes instalar dependencias usando la extension <code>  --legacy-peer-deps</code> Gracias !!
        </p>
      </header>

    </div>
    <div >
 
    </div>
    </>
  )
}

export default IndexPage
