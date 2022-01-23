import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.css'
import variables from '../styles/variables.module.scss';
import Header from '../sections/Header/index';

const Home: NextPage = () => {
  return (
    <div className="ofl-x-h">
      <Header isDrawerOpen={false} />
    </div>
  )
}

export default Home
