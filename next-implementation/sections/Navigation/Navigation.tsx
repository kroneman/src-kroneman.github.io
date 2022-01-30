import React, {useEffect, useRef, useState} from 'react';
import styles from './Navigation.module.scss';
import NavigationLink from "./NavigationLink";

type INavLink = {
  anchor: string;
  title: string;
  isActive: boolean;
  anchorLocation: null | number,
  anchorElement: null | Element,
}

type NavigationProps = {
  onNavigate: () => void
}

const Navigation = (props: NavigationProps) => {
  const { onNavigate } = props;
  const [isLoading, setIsLoading] = useState(true);
  const navLinks = useRef<INavLink[]>();

  const getAnchorElements = (navLinkMap: INavLink) => {
    const anchorElement = document.querySelector(navLinkMap.anchor);
    return {
      ...navLinkMap,
      anchorElement,
    };
  }

  useEffect(() => {
    navLinks.current = links.map(getAnchorElements);
    setIsLoading(false);
  }, []);

  if(isLoading) {
    return null;
  }

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_list}>
        {navLinks.current && navLinks.current?.map((link, index) => (
          <NavigationLink link={link} key={index} onNavigate={onNavigate} />
        ))}
      </ul>
    </nav>
  );
}

const links = [
  {
    anchor: '#Projects',
    title: 'Projects',
    isActive: false,
    anchorLocation: null,
    anchorElement: null,
  },
  {
    anchor: '#Experience',
    title: 'Experience',
    isActive: false,
    anchorLocation: null,
    anchorElement: null,
  },
  {
    anchor: '#Tech',
    title: 'Tech',
    isActive: false,
    anchorLocation: null,
    anchorElement: null,
  },
  {
    anchor: '#About',
    title: 'About',
    isActive: false,
    anchorLocation: null,
    anchorElement: null,
  },
  {
    anchor: '#Contact',
    title: 'Contact',
    isActive: false,
    anchorLocation: null,
    anchorElement: null,
  }
];

export default Navigation;
