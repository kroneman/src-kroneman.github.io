import React from 'react';
import styles from './Drawer.module.scss';

type DrawerProps = {
  isOpen: boolean;
  children?: React.ReactNode | React.ReactNode[]
}

const Drawer = (props: DrawerProps) => {
  const { children, isOpen } = props;
  const wrapperStyles = [
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
