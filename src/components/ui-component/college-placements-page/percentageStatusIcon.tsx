import React from 'react';
import Image from 'next/image';

const ArrowImage = ({ status }: { status: string }) => {
  if (status === 'It Is A Decrease Of') {
    return (
      <Image
        src="/assets/images/icons/arrowRightDown.svg"
        height={24}
        width={24}
        style={{ marginRight: '4px' }}
        alt="arrow down"
      />
    );
  } else if (status === 'It Is An Increase Of') {
    return (
      <Image
        src="/assets/images/icons/arrowRightUp.svg"
        height={24}
        width={24}
        style={{ marginRight: '4px' }}
        alt="arrow up"
      />
    );
  } else {
    return (
      <Image
        src="/assets/images/icons/SyncAltIcon.svg"
        height={24}
        width={24}
        style={{ marginRight: '4px' }}
        alt="arrow equal"
      />
    );
  }
};

export default ArrowImage;
