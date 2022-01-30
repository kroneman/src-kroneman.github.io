import React from 'react';
import WorldMap from '../../public/assets/map/worldMap.svg';

import styles from './AnimatedMap.module.scss'

type AnimatedMapProps = {
  testMap?: boolean;
  animatedMap?: boolean;
};

const AnimatedMap = (props: AnimatedMapProps) => {
  const {
    testMap = false,
    animatedMap = false
  } = props;

  return <div className={styles.WorldMap}><WorldMap /></div>
}

export default AnimatedMap;
