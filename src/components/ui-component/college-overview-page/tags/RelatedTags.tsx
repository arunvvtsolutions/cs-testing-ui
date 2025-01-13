import React from 'react';
import Link from 'next/link';
import { Box } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useParams } from 'next/navigation';

import styles from './Tags.module.css';

import { ISubMenuProps } from 'ui-component/subheader';
import { IInnerPageParams } from 'types';

export interface IRelatedTagProps extends ISubMenuProps {
  tagShortName?: string;
}

const RelatedTag: React.FC<IRelatedTagProps> = ({ tagShortName, subMenu }) => {
  const params = useParams<IInnerPageParams>();
  const ins = params?.ins;
  const name = params?.name;

  const tagData = [
    {
      linkId: 2,
      title: 'Course & Fees',
      link: 'course-fees'
    },
    {
      linkId: 4,
      title: 'Placement',
      link: 'placement'
    },
    {
      linkId: 8,
      title: 'Student Strength',
      link: 'student-strength'
    },
    {
      linkId: 3,
      title: ' Admissions & Eligibility',
      link: 'admission-eligibility'
    },
    {
      linkId: 5,
      title: 'Amenities',
      link: 'amenities'
    },
    {
      linkId: 6,
      title: 'Cutoff',
      link: 'cutoff'
    },
    {
      linkId: 7,
      title: 'Faculty',
      link: 'faculty'
    },
    {
      linkId: 11,
      title: 'Q & A',
      link: 'questions'
    },
    {
      linkId: 9,
      title: 'Reviews',
      link: 'review'
    },
    {
      linkId: 10,
      title: 'Pictures',
      link: 'pictures'
    },
    {
      linkId: 12,
      title: 'Contact',
      link: 'contact'
    },
    {
      linkId: 13,
      title: 'Affiliated Colleges',
      link: 'affiliated-college'
    }
  ];

  return (
    <>
      <Box className={styles.relatedLink} data-test-id="overview-tags">
        <Box className={styles.relatedContainer}>
          {tagData.map(
            (tag, index) =>
              !subMenu?.some((menu) => menu.menuId === tag.linkId) && (
                <Box className={styles.linkWrapper} key={index} data-test-id={`overview-tags-${tag.linkId}`}>
                  <Link
                    className={styles.relatedLink}
                    key={index}
                    href={`/${ins}/${name}/${tag.link}`}
                    as={`/${ins}/${name}/${tag.link}`}
                    data-test-id={`overview-tags-taglink-${tag.linkId}`}
                  >
                    {`${tagShortName} ${tag.title}`}
                    <ArrowForwardIosIcon className={styles.forwardArrow} />
                  </Link>
                </Box>
              )
          )}
        </Box>
      </Box>
    </>
  );
};

export default RelatedTag;
