import React from 'react';
import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'

import variables from '../styles/variables.module.scss';
import Header from '../sections/Header/index';
import CanvasAnimation from "../components/CanvasAnimation";
import Card from '../components/Card';
import homeData from '../data/home';

import styles from './index.module.scss';

const Home: NextPage = () => {

  return (
    <div className="overflow-x-hidden">
      <Header isDrawerOpen={false} />
      <div className="app-container">
        <div className="home">
          <div id="Intro" className={`${styles.home_section} bg-primary text-primaryAlt py-6 relative`}>
            <CanvasAnimation animationType="intro" withSkipAnimation={true} withReplayAnimation={true} />
          </div>

          <div id="Projects" className={`${styles.home_section} pt-6 md:py-6 px-0`}>
            <div className="container flex basis-full items-center overflow-hidden">
              <div className="px-4 flex flex-wrap w-full items-center">
                <div className="basis-full">
                  <h2 className="md:my-3 md:pb-4 md:py-4">{homeData.introText}</h2>
                  <div className="px-4 flex flex-wrap justify-center">
                    {homeData.introItems.map((introItem, index) => (
                      <Card
                        className="basis-full md:basis-6/12 lg:basis-4/12 md:px-4 pb-6"
                        key={index}
                        link={introItem.link}
                        linkExternal={introItem.linkExternal}
                        linkText={introItem.linkText}
                        text={introItem.text}
                        title={introItem.title}
                        // @ts-ignore
                        icon={introItem.icon}
                        image={introItem.image}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home
