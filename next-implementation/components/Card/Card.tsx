import React from 'react';

// Types
import {IconName} from "../Icon/Icon";

// Components
import Icon from "../Icon";
import Image from 'next/image';

// Styles
import styles from './Card.module.scss';
import CustomLink from "../CustomLink";

type CardProps = {
  image?: string;
  icon?: IconName;
  title?: string;
  text?: string;
  link: string;
  linkExternal?: boolean
  linkText?: string
} & React.ComponentProps<any>;

const Card = (props: CardProps) => {
  const {
    image = null,
    icon = null,
    title = null,
    text = null,
    link,
    linkExternal = false,
    linkText = null,
    className
  } = props;

  const cardWrapperStyles = [
    styles.card,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={cardWrapperStyles}>
      <div className={styles.card_image}>
        {image ? <Image width={477} height={233} layout="responsive" src={image} alt="" /> : null}
        {icon ? (
          <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full flex justify-center">
            <Icon name={icon} className={styles.card_icon} />
          </div>
        ): null}
      </div>
      <div className={`${styles.card_text} p-4`}>
        <h4 className="my-1">{title}</h4>
        <p className="fs-16 md:fs-18">{text}</p>
        <CustomLink href={link} className="fs-18" external={linkExternal}>
          {linkText
            ? (<span>{linkText}</span>)
            : (<span>{link}</span>)
          }
        </CustomLink>
      </div>
    </div>
  );
}

export default Card;
