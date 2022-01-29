import React from 'react';

// Svgs
import Linkedin from '../../public/assets/icons/linkedin.svg';
import Gmail from '../../public/assets/icons/gmail.svg';
import Github from '../../public/assets/icons/github.svg';
import Stackoverflow from '../../public/assets/icons/stackoverflow.svg';
import GoogleAppsScript from '../../public/assets/icons/google-apps-script.svg';
import LionLogo from '../../public/assets/icons/lion-logo.svg';

// styles
import styles from './Icon.module.scss';

const IconMap = {
  linkedin(props: React.ComponentProps<any>) {
    return <Linkedin {...props} />
  },
  gmail(props: React.ComponentProps<any>) {
    return <Gmail {...props} />
  },
  github(props: React.ComponentProps<any>) {
    return <Github {...props} />
  },
  stackoverflow(props: React.ComponentProps<any>) {
    const { className, ...otherProps } = props;
    return <Stackoverflow {...otherProps} className={`${className} ${styles.stackoverflow}`} />
  },
  googleappsscript(props: React.ComponentProps<any>) {
    debugger
    return <GoogleAppsScript {...props} />
  },
  lionlogo(props: React.ComponentProps<any>) {
    return <LionLogo {...props} />
  },
}

export type IconName = keyof typeof IconMap;
type IconProps = {
  name: IconName,
  className?: string
}

const Icon = (props: IconProps) => {
  const { name, className, ...otherProps } = props;

  if(!IconMap.hasOwnProperty(props.name)) {
    console.warn('invalid icon name', props.name);
    return null;
  }

  const IconComponent = IconMap[props.name];
  const iconStyles = [
    styles.icon,
    className
  ].filter(Boolean).join(' ')
  return <IconComponent {...otherProps} className={iconStyles} />
}

export default Icon;
