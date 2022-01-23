import React from 'react';
import styles from './SocialList.module.scss';
import CustomLink from "../../components/CustomLink";
import Icon, {IconName} from "../../components/Icon/Icon";

type SocialListProps = {
  className?: string;
}

type SocialDataItem = {
  icon: IconName,
  link: string
}

const SocialList = (props: SocialListProps) => {
  const { className } = props;
  const socialData: SocialDataItem[] = [
    {
      icon: 'stackoverflow',
      link: 'https://stackoverflow.com/users/6598680/lkroneman',
    },
    {
      icon: 'gmail',
      link: 'mailto:a.l.kroneman@gmail.com?subject=kroneman.io',
    },
    {
      icon: 'linkedin',
      link: 'https://www.linkedin.com/in/kroneman/',
    },
    {
      icon: 'github',
      link: 'https://github.com/kroneman',
    },
  ];

  const wrappingStyles = [
    styles.social,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={wrappingStyles}>
      <ul className={styles.social_list}>
        {socialData.map((item, index) => (
          <li className={`${styles.social_list_item} py-2`} key={index}>
            <CustomLink href={item.link} external={true} className={styles.social_list_link}>
              <Icon name={item.icon} />
            </CustomLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SocialList;
