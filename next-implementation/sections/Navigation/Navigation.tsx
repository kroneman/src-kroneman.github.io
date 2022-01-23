import React, {useEffect, useState} from 'react';
import styles from './Navigation.module.scss';
import {debounce, isInViewport, throttle} from "../../utils";

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
  const [navLinks, setNavLinks] = useState<INavLink[]>(links);

  const getLinkClassName = (isActive: boolean) => {
    return [
      styles.nav_list_link,
      isActive ? styles.is_active : null
    ].filter(Boolean).join(' ');
  }

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, anchorElement: HTMLElement) => {
    onNavigate();
    const distanceToTop = (el: HTMLElement) => Math.floor(el.getBoundingClientRect().top);
    e.preventDefault();
    if (!anchorElement) {
      return;
    }

    const originalTop = distanceToTop(anchorElement);
    window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
  }

  const onClickItem = (e: React.MouseEvent<HTMLAnchorElement>, anchorElement: any) => {
    scrollTo(e, anchorElement);
  }

  const getAnchorElements = (navLinkMap: INavLink) => {
    const anchorElement = document.querySelector(navLinkMap.anchor);
    debugger
    return {
      ...navLinkMap,
      anchorElement,
    };
  }

  const getAnchorLocations = debounce(function getLocations() {
    const withAnchorLocations = navLinks.map((link) => {
      if(!link.anchorElement) {
        return link;
      }

      const anchorLocation = Math.floor(link.anchorElement.getBoundingClientRect().top);
      return {
        ...link,
        anchorLocation: anchorLocation || null,
      };
    })
      // .filter((item) => Boolean(item.anchorElement));

    setNavLinks(withAnchorLocations);
    setIsLoading(false);
  }, 100);

  const onScrollHandler = throttle(function onScroll() {
    const updatedAnchorElements = navLinks.map((link) => {
      const isActive = link.anchorElement ? isInViewport(link.anchorElement, 500) : false;
      return {
        ...link,
        isActive,
      };
    });

    setNavLinks(updatedAnchorElements);
  }, 100)

  useEffect(() => {
    const withAnchorElements = navLinks.map(getAnchorElements);
    setNavLinks(withAnchorElements);
  }, []);

  useEffect(() => {
    if(!navLinks) {
      return;
    }

    getAnchorLocations();
  }, [navLinks]);

  useEffect(() => {
    onScrollHandler();

    window.addEventListener('scroll', onScrollHandler);
    window.addEventListener('resize', getAnchorLocations);

    // Cleanup during un-mount
    return () => {
      window.removeEventListener('scroll', onScrollHandler);
      window.removeEventListener('resize', getAnchorLocations);
    };
  }, [isLoading]);

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav_list}>
        {navLinks && navLinks.map((link, index) => (
          <li key={index} className={styles.nav_list_item}>
            <a onClick={(e) => onClickItem(e, link.anchorElement)}
               className={getLinkClassName(link.isActive)}>{link.title}</a>
          </li>
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
