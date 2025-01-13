import React, { useState } from 'react';
import { Rating } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/system';

interface StarRatingProps {
  value: number;
  onChange: (newValue: number) => void;
}

const theme = createTheme({
  components: {
    MuiRating: {
      styleOverrides: {
        iconFilled: {
          color: '#0B6049' // Set the color for stars here
        }
      }
    }
  }
});

export const StarRating: React.FC<StarRatingProps> = ({ value, onChange }) => {
  return (
    <Rating
      value={value}
      max={5}
      sx={{
        fontSize: '20px',
        '& .MuiRating-icon': {
          width: '1.5rem'
        }
      }}
      onChange={(event, newValue) => {
        if (newValue) {
          onChange(newValue);
        }
      }}
    />
  );
};
interface RatingStarsProps {
  starsValue: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ starsValue }) => {
  const [rating, setRating] = useState<number>(starsValue);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ marginBottom: '10px' }}>
        <StarRating value={rating} onChange={handleRatingChange} />
      </Box>
    </ThemeProvider>
  );
};

export default RatingStars;
