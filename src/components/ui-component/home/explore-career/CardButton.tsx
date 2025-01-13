import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { ButtonBox, Buttons } from './styles';

interface CardButtonProps {
  buttonProps: () => void;
  scroll: boolean;
  butonName: string;
}

const CardButton: React.FC<CardButtonProps> = ({ buttonProps, scroll, butonName }) => {
  return (
    <Buttons scroll={scroll} onClick={buttonProps}>
      <ButtonBox scroll={scroll}> {butonName}</ButtonBox>
      <AddCircleOutlineIcon
        sx={{
          fontSize: '18px',
          color: '#202124',
          transform: scroll ? 'rotate(45deg)' : 'none'
        }}
      />
    </Buttons>
  );
};

export default CardButton;
