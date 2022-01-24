import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'

import variables from '../styles/variables.module.scss';
import Header from '../sections/Header/index';
import CanvasAnimation from "../components/CanvasAnimation";

import styles from './index.module.scss';

const Home: NextPage = () => {
  return (
    <div className="ofl-x-h">
      <Header isDrawerOpen={false} />
      <div className="app-container">
        <div className="home">
          <div id="Intro" className={`${styles.home_section} bg-primary text-primaryAlt py-6 relative`}>
            <CanvasAnimation animationType="intro" withSkipAnimation={true} withReplayAnimation={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
