import React from 'react';

import styles from './CustomButton.module.scss';

type CustomButtonProps = {} & React.ComponentProps<any>;

const CustomButton = (props: CustomButtonProps) => {
  const {
    children,
    className,
    ...otherProps
  } = props;

  const buttonClassName = [
    styles.button,
    className
  ].filter(Boolean).join(' ')

  return (
    <button {...otherProps} className={buttonClassName}>{children}</button>
  );
}

export default CustomButton;
