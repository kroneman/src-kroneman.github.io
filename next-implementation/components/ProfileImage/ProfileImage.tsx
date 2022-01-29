import React from 'react';
import Image from 'next/image';

// Assets
import profileImage from '../../public/assets/profile_image.jpg';
import styles from './ProfileImage.module.scss';

type ProfileImageProps = {}

const ProfileImage = (props: ProfileImageProps) => {
  return (
    <div className={styles.profileImage}>
      <Image src={profileImage} width={320} height={422} layout="responsive" alt="" />
    </div>
  );
}

export default ProfileImage;
