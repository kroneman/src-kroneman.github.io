import React from 'react';
import styles from './Drawer.module.scss';

type DrawerProps = {
  isOpen: boolean;
  children?: React.ReactNode | React.ReactNode[],
  className?: string
}

const Drawer = (props: DrawerProps) => {
  const { children, isOpen, className } = props;
  const wrapperStyles = [
    className,
    styles.mobile_drawer,
    isOpen ? styles.is_open : null
  ].filter(Boolean).join(' ')

  return (
    <div className={wrapperStyles}>
      <div className={styles.mobile_drawer_content}>
        {children}
      </div>
    </div>
  );
}

export default Drawer;
