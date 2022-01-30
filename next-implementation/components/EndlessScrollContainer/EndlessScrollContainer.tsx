import React from 'react';

// Styles
import styles from './EndlessScrollContainer.module.scss'

type EndlessScrollContainerProps = {} & React.ComponentProps<any>;

const EndlessScrollContainer = (props: EndlessScrollContainerProps) => {
  const {
    children,
    ...otherProps
  } = props;

  return (
    <div {...otherProps} className={styles.endless_scroll_map}>
      <div className={styles.endless_scroll_container}>
        <div className={styles.endless_scroll_items}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default EndlessScrollContainer;
