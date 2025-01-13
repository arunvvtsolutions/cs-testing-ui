import Image from 'next/image';
import React from 'react';

export interface IImageProps {
  src: string;
  altText: string;
}

const MainIcon: React.FC<IImageProps> = ({ src, altText }) => {
  return <Image src={`/assets/images/${src}`} alt={altText} width={40} height={40} />;
};

export default MainIcon;
