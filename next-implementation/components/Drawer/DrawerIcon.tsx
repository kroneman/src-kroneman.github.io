import React from 'react';
import styles from './DrawerIcon.module.scss';

type DrawerIconProps = {
  isActive: boolean;
  onClick: () => void
}

const DrawerIcon = (props: DrawerIconProps) => {
  const { isActive, onClick } = props;
  const wrappingStyles = [
    styles.drawer_icon,
    isActive ? styles.is_active : null
  ].filter(Boolean).join(' ');

  return (
    <div
      className={wrappingStyles}
      onClick={onClick}
    >
      <div className={styles.drawer_icon_container} >
        <span className={styles.drawer_icon_line} />
        <span className={styles.drawer_icon_line} />
        <span className={styles.drawer_icon_line} />
      </div>
    </div>
  );
}

export default DrawerIcon;
