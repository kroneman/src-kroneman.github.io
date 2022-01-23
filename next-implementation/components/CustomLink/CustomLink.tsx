import React from 'react';
import Link from 'next/link'
import styles from './CustomLink.module.scss';

type CustomLinkProps = {
  external?: boolean;
  email?: boolean;
  href: string;
  eventCategory?: string;
  eventAction?: string;
  children: React.ReactNode | React.ReactNode[],
  className: string
}

const CustomLink = (props: CustomLinkProps) => {
  const {
    external = false,
    email = false,
    href,
    eventCategory = 'linkCustom',
    eventAction = 'navigate',
    children,
    className
  } = props;

  const trackLink = () => {
    if (window.ga) {
      window.ga.event({
        eventCategory: eventCategory,
        eventAction: eventAction,
        eventLabel: href,
      });
    }
  }

  if (external) {
    return (
      <span className={`${className} ${styles.link_custom}`}>
        <a href={href} onClick={trackLink} target="_blank" rel="noreferrer">{children}</a>
      </span>
    );
  }

  if (email) {
    return (
      <span className={`${className} ${styles.link_custom}`}>
        <a href={href} onClick={trackLink}>{children}</a>
      </span>
    );
  }

  return (
    <span className={`${className} ${styles.link_custom}`}>
      <Link href={href}>{children}</Link>
    </span>
  );
}

export default CustomLink;
