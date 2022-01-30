import React from 'react';
import type {NextPage} from 'next'

import Header from '../sections/Header/index';
import CanvasAnimation from "../components/CanvasAnimation";
import Card from '../components/Card';
import ProfileImage from "../components/ProfileImage";
import homeData from '../data/home';

import styles from './index.module.scss';
import CustomLink from "../components/CustomLink";
import AnimatedMap from "../components/AnimatedMap";
import EndlessScrollContainer from "../components/EndlessScrollContainer";

const Home: NextPage = () => {

  return (
    <div className="overflow-x-hidden">
      <Header isDrawerOpen={false}/>
      <div className="app-container">
        <div className="home">
          <div id="Intro"
               className={`${styles.home_section} bg-primary text-primaryAlt py-6 relative`}>
            <CanvasAnimation animationType="intro" withSkipAnimation={true}
                             withReplayAnimation={true}/>
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

          <div id="Experience"
               className={`${styles.home_section} bg-primary text-primaryAlt py-6 relative`}>
            {/*<CanvasAnimation/>*/}
            <div className="container flex items-center">
              <div className="block w-full">
                <div className="px-1 flex flex-wrap overflow-hidden align-items-center">
                  <div className="basis-full text-center">
                    <h2 className="text-center my-5">{homeData.experienceHeader}</h2>
                    <div className="px-1 flex flex-wrap overflow-hidden justify-center">
                      {homeData.experienceCompanies.map((company, index) => (
                        <div key={index}>
                          <div className="py-4 md:p-5 text-left d-inline-block mx-auto">
                            <p className="text-3xl my-1 text-center">{company.duration}</p>
                            <h3 className="text-center my-1">{company.titleLocation}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p>{homeData.experienceProjectsText}</p>
                    <ul className="mx-auto inline-block text-center py-6 px-0 list no-bullets">
                      {homeData.experienceProjects.map((project, index) => (
                        <li key={index} className="md:pt-2">
                          <CustomLink href={project.link} eventAction="experienceProject"
                                      className="underline">
                            {project.text}
                          </CustomLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="Tech" className={`${styles.home_section} relative`}>
            {/*<gravity-points />*/}
            <div className="container w-full flex justify-center items-center z-1">
              <div className="block w-full">
                <div className="flex flex-wrap overflow-hidden items-center">
                  <div className="basis-full py-6">
                    <h2 className="my-4">{homeData.technologiesHeader}</h2>
                    <ul
                      className="mx-auto inline-block text-center px-0 py-6 list no-bullets equal-height">
                      {homeData.technologiesList.map((tech, index) => (
                        <li key={index}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="About"
               className={`${styles.home_section} bg-primary text-primaryAlt home-section--about text-center relative py-6`}>
            <EndlessScrollContainer className={`${styles.home_section_mapContainer} my-6`}>
              <AnimatedMap/>
              <AnimatedMap/>
              <AnimatedMap/>
            </EndlessScrollContainer>
            <div className="container flex items-center">
              <div className="row flex px-4 items-center justify-center">
                <div className="basis-full md:basis-10/12 lg:basis-8/12 xl:basis-6/12 py-6 px-6">
                  <h2 className="py-4">{homeData.aboutHeader}</h2>
                  {homeData.aboutParagraphs.map((paragraph, index) => (
                    <p key={index} className="md:text-[20px] leading-10">{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div id="Contact" className={styles.home_section}>
            <div className="container flex items-center">
              <div className="block w-full">
                <div className="flex row flex-wrap overflow-hidden items-center justify-center">
                  <div className="basis-full pb-4">
                    <div className="flex justify-center w-full">
                      {/*<profile-image />*/}
                      <ProfileImage/>
                    </div>
                  </div>
                  <div className="basis-full">
                    <h2 className="py-6">{homeData.connectHeader}</h2>
                    <p>{homeData.connectMessage}</p>
                    <ul
                      className="px-0 mx-auto md:flex md:flex-wrap justify-center align-center text-center md:text-left py-6  list no-bullets"
                    >
                      {homeData.connectLinks.map((linkItem, index) => (
                        <li key={index} className="pt-2 md:pt-0 md:px-5 md:text-center underline">
                          <CustomLink href={linkItem.link} external={linkItem.external}
                                      email={linkItem.email}>
                            {linkItem.text}
                          </CustomLink>
                        </li>
                      ))}
                    </ul>
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
