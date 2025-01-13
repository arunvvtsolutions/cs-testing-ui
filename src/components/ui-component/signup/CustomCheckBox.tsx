import { Box, Checkbox } from '@mui/material';
import React, { useState } from 'react';
interface CheckBoxProps {
  onCheckChange: (isChecked: boolean) => void;
  id: string;
}

const CustomCheckBox: React.FC<CheckBoxProps> = ({ onCheckChange, id }) => {
  // State to track whether the checkbox is checked
  const [checked, setChecked] = useState(false);

  // Handle checkbox state change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onCheckChange(event.target.checked);
  };

  return (
    <Box>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        id={id}
        sx={{
          color: '#E0E0E0',
          '&.Mui-checked': {
            color: '#222831'
          },
          padding: '9px 9px 9px 0px'
        }}
      />
    </Box>
  );
};

export default CustomCheckBox;
