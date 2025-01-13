import { Rating } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
interface IRatingProps {
  starValue: number;
  onChange: (newValue: number) => void;
  dataTestId: string;
}
const theme = createTheme({
  components: {
    MuiRating: {
      styleOverrides: {
        iconFilled: {
          color: '#119D78' // Set the color for stars here
        }
      }
    }
  }
});
const AddReviewStars: React.FC<IRatingProps> = ({ starValue, onChange, dataTestId }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Rating
          data-test-id={dataTestId}
          value={starValue}
          onChange={(event, newValue) => {
            if (newValue) {
              onChange(newValue);
            }
          }}
        />
      </ThemeProvider>
    </>
  );
};

export default AddReviewStars;
