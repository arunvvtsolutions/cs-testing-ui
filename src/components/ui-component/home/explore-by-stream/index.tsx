'use client';
import { Hidden, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { HomeTitles } from '../../../../constants';

import {
  Collegestyle,
  CostomboxWrapCols,
  CostomboxWraper,
  ContainerWarp,
  HiddenBox,
  SubBox,
  MainBox,
  Imagebox,
  CourseIcon,
  TextBox
} from './styles';

import { ENGINEERING_BASE_URL, MEDICAL_BASE_URL } from 'config';

interface Category {
  img: string;
  title: string;
  link: string;
}

const data: Category[] = [
  {
    img: 'engineer.webp',
    title: 'Engineering',
    link: `${ENGINEERING_BASE_URL}/top/engineering/colleges-in-india`
  },
  {
    img: 'medical.webp',
    title: 'Medical',
    link: `${MEDICAL_BASE_URL}/top/medical/colleges-in-india`
  },
  {
    img: 'dental.webp',
    title: 'Dental',
    link: `${MEDICAL_BASE_URL}/top/dental/colleges-in-india`
  },
  {
    img: 'architecture.webp',
    title: 'Architecture',
    link: `${ENGINEERING_BASE_URL}/top/architecture/colleges-in-india`
  },
  {
    img: 'pharmacy.webp',
    title: 'Pharmacy',
    link: `${MEDICAL_BASE_URL}/top/pharmacy/colleges-in-india`
  }
];

const Icon = {
  width: '18px',
  height: '18px',
  color: '#202124'
};

const ExploreByStream: React.FC = () => {
  return (
    <MainBox>
      <ContainerWarp>
        <Typography variant="h2" className="h2_tag">
          {HomeTitles.EXPLORE_BY_STREAM}
        </Typography>
        <CostomboxWraper>
          {data &&
            data?.map((item, index) => (
              <CostomboxWrapCols key={index} href={item.link} prefetch={false}>
                <SubBox key={index}>
                  <Imagebox>
                    <CourseIcon
                      src={`/assets/images/streams/${item.img}`}
                      width={40}
                      height={40}
                      style={{ backgroundColor: 'transparent' }}
                      alt=""
                      loading="lazy"
                    />
                  </Imagebox>
                  <TextBox>
                    <a href={item.link}>
                      {item.title}
                    </a>
                    <Collegestyle>{HomeTitles.EXPLORE_BY_STREAM_CLG}</Collegestyle>
                  </TextBox>
                  <Hidden smUp>
                    <HiddenBox>
                      <ChevronRightIcon style={Icon} />
                    </HiddenBox>
                  </Hidden>
                </SubBox>
              </CostomboxWrapCols>
            ))}
        </CostomboxWraper>
      </ContainerWarp>
    </MainBox>
  );
};
export default ExploreByStream;
