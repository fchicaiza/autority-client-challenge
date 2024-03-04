import type { NextPage } from 'next';
import Head from 'next/head';
import { NavbarComponent } from '../components';
import styles from '../styles/Home.module.css';

const IndexPage: NextPage = () => {
  return (
    <><NavbarComponent></NavbarComponent><div className="container">

      <Head>
        <title>Autority Challenge</title>
      </Head>
      <div className={styles.centerContent}>
        <header className={styles.header}>
          <p>
            Abre el menú para acceder a los CRUDS, debes instalar dependencias usando la extensión{' '}
            <code>--legacy-peer-deps</code> ¡Gracias!
          </p>
        </header>
      </div>
    </div></>
  );
};

export default IndexPage;
