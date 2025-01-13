import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import { BoxTag, CustomBookmarkIcon } from './styles';

const BookMarkTag = ({
  collegeId,
  handleUpdateBookMark,
  bookMarkArray,
  stream,
  shortUrl
}: {
  collegeId: number;
  handleUpdateBookMark: (value: number, stream: string, shortUrl: string) => void;
  bookMarkArray: number[];
  stream: string;
  shortUrl: string;
}) => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <BoxTag>
      <Checkbox
        {...label}
        icon={<BookmarkBorderIcon />}
        checkedIcon={<CustomBookmarkIcon />}
        data-test-id="listing-page-card-bookmark"
        value={collegeId}
        checked={bookMarkArray.includes(collegeId)}
        onClick={() => handleUpdateBookMark(collegeId, stream, shortUrl)}
      />
    </BoxTag>
  );
};

export default BookMarkTag;
