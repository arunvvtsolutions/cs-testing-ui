'use client';
import { useEffect, useState } from 'react';
import { Pagination, Box, Button, Typography, Badge } from '@mui/material';

import campus from '../../../../../public/assets/images/cs/campus.webp';

import styles from './styles.module.css';
import {
  BodyBoxTag,
  CardBody,
  CardTop,
  CollegeIcon,
  CollegeName,
  CollegeNameBox,
  CollegesListingCard,
  LineDivider,
  LoadButton,
  MainBox,
  SpecialTag,
  SubBox,
  SubBoxTag,
  TypographyTag
} from './styles';
import CollegeDetailsButton from './CollegeDetailsButton';
import CheckboxForCompare from './CheckboxForCompare';
import BookMarkTag from './BookMarkButton';
import { ButtonName, ListingCardTitles } from './constant';
import CompareHistoryModel from './CompareHistoryModel';

import { ICollege } from 'types/college';
import { Submenu } from 'types';
import { useSelector } from 'store';
interface CollegeProps {
  collegeData: ICollege[];
  topColleges?: ICollege[];
  enableLoadMore?: boolean;
  disablePagination?: boolean;
  bookMarkArray?: number[];
  hideCompare?: boolean;
  handleUpdateBookMark?: (collegeId: number, stream: string, shortUrl: string) => void;
}

const ListingPageCards: React.FC<CollegeProps> = ({
  collegeData,
  topColleges,
  enableLoadMore = true,
  disablePagination = false,
  bookMarkArray,
  hideCompare = false,
  handleUpdateBookMark
}) => {
  const { comparedColleges } = useSelector((state) => state.studentProfile);
  const [visibleCards, setVisibleCards] = useState(10);
  const [filteredColleges, setFilteredColleges] = useState<ICollege[]>(collegeData);
  const [open, setOpen] = useState<boolean>(false);
  const [compareColleges, setCompareColleges] = useState<ICollege[]>([]);
  const [page, setPage] = useState<number>(1);
  const loadMore = () => {
    const newCollegeData = [...collegeData];
    setFilteredColleges(newCollegeData.slice(0, visibleCards + 10));
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 10);
  };

  const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // model open
  const handleOpenModel = () => {
    setOpen(true);
  };

  // model close
  const handleCloseModel = () => {
    setOpen(false);
  };

  useEffect(() => {
    const newCollegeData = [...collegeData];
    setFilteredColleges(newCollegeData.slice((page - 1) * 10, page * 10));
  }, [collegeData, page]);

  useEffect(() => {
    setPage(1);
  }, [collegeData]);

  useEffect(() => {
    setCompareColleges(comparedColleges);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MainBox data-test-id="listing-page-card">
        {compareColleges.length > 0 && (
          <Button
            className={styles.compareHistoryBtn}
            onClick={handleOpenModel}
            data-test-id="compare-colleges-count-btn-from-listingpage"
          >
            <Badge
              badgeContent={compareColleges.length}
              className={styles.compareHistoryBadge}
              sx={{
                '.MuiBadge-badge': {
                  backgroundColor: '#CBF7DA',
                  color: '#02282E',
                  transform: 'scale(1) translate(90%, -100%)'
                }
              }}
            >
              <Box className={styles.compareHistoryBox}>
                <Typography className={styles.compareHistoryTxt}>{ButtonName.COMPARE_HISTORY}</Typography>
              </Box>
            </Badge>
          </Button>
        )}
        {filteredColleges &&
          filteredColleges.map((college, index) => (
            <CollegesListingCard key={index} data-test-id={`listing-page-card-${college.shortUrl}`}>
              <CardTop>
                <SubBox>
                  <CollegeIcon
                    src={college.logo ? `/assets/images/cs/${college.logo}` : campus}
                    alt={`${college.logo}`}
                    width={48}
                    height={48}
                    data-test-id={`listing-page-card-${college.logo}`}
                    onError={(e) => {
                      e.currentTarget.src = `${campus}`;
                      e.currentTarget.srcset = `${campus}`;
                    }}
                  />
                </SubBox>
                <CollegeNameBox>
                  <CollegeName href={`/${college.insType}/${college.shortUrl}/overview`}>{college.name}</CollegeName>
                  <SubBoxTag>
                    <TypographyTag>
                      {ListingCardTitles.OWNERSHIP}
                      <SpecialTag>{college.ownership}</SpecialTag>
                    </TypographyTag>
                    <TypographyTag>
                      {ListingCardTitles.ESTABLISHED}
                      <SpecialTag> {college.estdYear}</SpecialTag>
                    </TypographyTag>
                  </SubBoxTag>
                </CollegeNameBox>
                {handleUpdateBookMark && bookMarkArray && (
                  <BookMarkTag
                    collegeId={college.id}
                    handleUpdateBookMark={handleUpdateBookMark}
                    bookMarkArray={bookMarkArray}
                    stream={college.type}
                    shortUrl={college.shortUrl}
                  />
                )}
              </CardTop>
              <LineDivider />
              <CardBody>
                <BodyBoxTag>
                  {!(college.subMenu?.includes(',') ? college.subMenu.split(',') : [college.subMenu])?.includes(
                    Submenu.ADMISSION
                  ) && (
                    <CollegeDetailsButton
                      name={ButtonName.ADMISSIONS}
                      insType={college.insType}
                      link={'admission-eligibility'}
                      names={college.shortUrl}
                      data-test-id="listing-page-card-admissions-btn"
                    />
                  )}
                  <CollegeDetailsButton
                    name={ButtonName.COURSES_FEES}
                    insType={college.insType}
                    link={'course-fees'}
                    names={college.shortUrl}
                    data-test-id="listing-page-card-course-fees-btn"
                  />
                  {!(college.subMenu?.includes(',') ? college.subMenu.split(',') : [college.subMenu])?.includes(
                    Submenu.CUTOFF
                  ) && (
                    <CollegeDetailsButton
                      insType={college.insType}
                      name={ButtonName.CUTOFF}
                      link={'cutoff'}
                      names={college.shortUrl}
                      data-test-id="listing-page-card-cutoff-btn"
                    />
                  )}
                  <CollegeDetailsButton
                    name={ButtonName.PLACEMENTS}
                    insType={college.insType}
                    link={'placement'}
                    names={college.shortUrl}
                    data-test-id="listing-page-card-placement-btn"
                  />
                </BodyBoxTag>
                {!hideCompare && (
                  <CheckboxForCompare
                    compareColleges={compareColleges}
                    setCompareColleges={setCompareColleges}
                    college={college}
                  />
                )}
              </CardBody>
            </CollegesListingCard>
          ))}
        {visibleCards < collegeData.length && enableLoadMore && (
          <LoadButton onClick={loadMore} data-test-id="listing-page-card-loadmore">
            {ListingCardTitles.LOAD_MORE}
          </LoadButton>
        )}

        {!enableLoadMore && !disablePagination && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            mb={4}
            data-test-id="listing-page-card-pagination"
          >
            <Pagination
              page={page}
              showFirstButton
              showLastButton
              hidePrevButton
              hideNextButton
              sx={{
                '& .MuiPagination-ul': {
                  flexWrap: 'nowrap'
                },
                '& .Mui-selected': {
                  backgroundColor: '#1452A4 !important',
                  color: '#FFF'
                }
              }}
              count={Math.ceil(collegeData.length / 10)}
              onChange={handlePagination}
            />
          </Box>
        )}
      </MainBox>
      {topColleges && (
        <CompareHistoryModel
          handlClose={handleCloseModel}
          open={open}
          compareColleges={compareColleges}
          setCompareColleges={setCompareColleges}
          collegeData={topColleges}
        />
      )}
    </>
  );
};

export default ListingPageCards;
