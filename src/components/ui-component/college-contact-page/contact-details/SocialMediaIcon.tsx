import Image from 'next/image';
import React from 'react';

import { IImageProps } from './MainIcon';

const SocialMediaIcon: React.FC<IImageProps> = ({ src, altText }) => {
  return <Image src={`/assets/images/${src}`} alt={altText} width={24} height={24} />;
};

export default SocialMediaIcon;
