import React, {useEffect, useState} from "react";
import styles from "./Navigation.module.scss";
import {isInViewport, throttle} from "../../utils";

type NavigationLinkProps = {
  onNavigate: () => void,
  link: {
    title: string;
    anchorElement: null | Element,
    isActive: boolean;
  }
}

const NavigationLink = (props: NavigationLinkProps) => {
  const {
    onNavigate,
    link
  } = props;
  const [isLinkActive, setLinkActive] = useState(link.isActive);
  const getLinkClassName = (isActive: boolean) => {
    return [
      styles.nav_list_link,
      isActive ? styles.is_active : null
    ].filter(Boolean).join(' ');
  }

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, anchorElement: HTMLElement) => {
    e.preventDefault();

    onNavigate();
    const distanceToTop = (el: HTMLElement) => Math.floor(el.getBoundingClientRect().top);
    if (!anchorElement) {
      return;
    }

    const originalTop = distanceToTop(anchorElement);
    window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
  }

  const onClickItem = (e: React.MouseEvent<HTMLAnchorElement>, anchorElement: any) => {
    scrollTo(e, anchorElement);
  }

  const onScrollHandler = throttle(function onScroll() {
    const isActive = link.anchorElement ? isInViewport(link.anchorElement, 500) : false;
    setLinkActive(isActive);
  }, 100)

  useEffect(() => {
    onScrollHandler();

    window.addEventListener('scroll', onScrollHandler);

    // Cleanup during un-mount
    return () => {
      window.removeEventListener('scroll', onScrollHandler);
    };
  }, []);

  return (
    <li className={styles.nav_list_item}>
      <a onClick={(e) => onClickItem(e, link.anchorElement)}
         className={getLinkClassName(isLinkActive)}>{link.title}</a>
    </li>
  );
}

export default NavigationLink;
