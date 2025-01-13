import { Box, Typography } from '@mui/material';
import Link from 'next/link';

import { ConditionTitles } from './constant';
import styles from './TermsandCondition.module.css';

const TermsAndCondition = () => {
  return (
    <>
      <Box className="containerWrapper">
        {/* PRIVACY POLICY */}
        <Box className={styles.overallBox}>
          <Box className={styles.staticCard}>
            <Box className={styles.titleHead}>
              <Typography className={styles.staticTitle}>{ConditionTitles.PRIVACY_POLICY}</Typography>
            </Box>
            {/* <Divider className={styles.borderLine} /> */}

            <Typography className={`${styles.staticDiscp} ${styles.singleDiscp}`}>
              {ConditionTitles.PRIVACY_POLICY_DISCP}
            </Typography>
            {/* Collection of Personal Information */}
            <Box className={styles.subBox}>
              <Typography className={styles.staticSubTitle}>{ConditionTitles.COLLECTION_INFO}</Typography>
              <Typography className={styles.staticDiscp}>{ConditionTitles.COLLECTION_INFO_DISCP}</Typography>
            </Box>
            {/* Use of Personal Information */}
            <Box className={styles.subBox}>
              <Typography className={styles.staticSubTitle}>{ConditionTitles.USE_INFO}</Typography>
              <Typography className={styles.staticDiscp}>{ConditionTitles.USE_INFO_DISCP}</Typography>
            </Box>
            {/* Protection of Personal Information */}
            <Box className={styles.subBox}>
              <Typography className={styles.staticSubTitle}>{ConditionTitles.PROTECTION_INFO}</Typography>
              <Typography className={`${styles.staticDiscp} ${styles.staticManyDiscp}`}>
                {ConditionTitles.PROTECTION_INFO_DISCP_1}
              </Typography>
              <Typography className={`${styles.staticDiscp} ${styles.staticManyDiscp}`}>
                {ConditionTitles.PROTECTION_INFO_DISCP_2}
              </Typography>
              <Typography className={`${styles.staticDiscp} ${styles.staticManyDiscp}`}>
                {ConditionTitles.PROTECTION_INFO_DISCP_3}
              </Typography>
              <Typography className={`${styles.staticDiscp} ${styles.staticManyDiscp}`}>
                {ConditionTitles.PROTECTION_INFO_DISCP_4}
              </Typography>
              <Typography className={styles.staticDiscp}>
                {ConditionTitles.PROTECTION_INFO_DISCP_5}{' '}
                <Link href={`mailto:${ConditionTitles.WEBSITE}`} className={styles.websiteUrl}>
                  {ConditionTitles.WEBSITE}
                </Link>
              </Typography>
            </Box>
          </Box>
          {/* TERMS & CONDITIONS */}
          <Box className={styles.staticCard}>
            <Box className={styles.titleHead}>
              <Typography className={styles.staticTitle}>{ConditionTitles.TERMS_CONDITIONS}</Typography>
            </Box>

            <Typography className={`${styles.staticDiscp} ${styles.singleDiscp}`}>
              {ConditionTitles.TERMS_CONDITIONS_DISCP}
            </Typography>
            {/* General Terms */}
            <Box className={styles.subBox}>
              <Typography className={styles.staticSubTitle}>{ConditionTitles.GENERAL_TERMS}</Typography>
              <Typography className={`${styles.staticDiscp} ${styles.staticManyDiscp}`}>
                {ConditionTitles.GENERAL_TERMS_DISCP_1}
              </Typography>
              <Typography className={`${styles.staticDiscp} ${styles.staticManyDiscp}`}>
                {ConditionTitles.GENERAL_TERMS_DISCP_2}
              </Typography>
              <Typography className={styles.staticDiscp}>{ConditionTitles.GENERAL_TERMS_DISCP_3}</Typography>
            </Box>
          </Box>
          {/* Payment Policy */}
          <Box className={styles.staticCard}>
            <Box className={styles.titleHead}>
              <Typography className={styles.staticTitle}>{ConditionTitles.PAYMENT_POLICY}</Typography>
            </Box>

            <Box className={styles.singleDiscp}>
              <Typography className={`${styles.staticDiscp} ${styles.staticManyDiscp}`}>
                {ConditionTitles.PAYMENT_POLICY_DISCP_1}
              </Typography>
              <Typography className={`${styles.staticDiscp} ${styles.staticManyDiscp}`}>
                {ConditionTitles.PAYMENT_POLICY_DISCP_2}
              </Typography>
              <Typography className={styles.staticDiscp}>{ConditionTitles.PAYMENT_POLICY_DISCP_3}</Typography>
            </Box>
            {/* Sharing of Personal Information */}
            <Box className={styles.subBox}>
              <Typography className={styles.staticSubTitle}>{ConditionTitles.SHARING_INFO}</Typography>
              <Typography className={styles.staticDiscp}>{ConditionTitles.SHARING_INFO_DISCP}</Typography>
            </Box>
            {/* Changes to the Privacy Policy */}
            <Box className={styles.subBox}>
              <Typography className={styles.staticSubTitle}>{ConditionTitles.CHANGES_POLICY}</Typography>
              <Typography className={styles.staticDiscp}>{ConditionTitles.CHANGES_POLICY__DISCP}</Typography>
            </Box>
            {/* Contact Information */}
            <Box>
              <Typography className={styles.staticSubTitle}>{ConditionTitles.CONTACT_INFO}</Typography>
              <Typography className={`${styles.staticDiscp} ${styles.staticManyDiscp}`}>
                {ConditionTitles.CONTACT_INFO_DISCP_1}{' '}
                <Link href={`mailto:${ConditionTitles.WEBSITE}`} className={styles.websiteUrl}>
                  {ConditionTitles.WEBSITE}
                </Link>
              </Typography>
              <Typography className={styles.staticDiscp}>{ConditionTitles.CONTACT_INFO_DISCP_2}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default TermsAndCondition;
