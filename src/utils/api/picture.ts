import { getBannerData, getOtherCollegeData, getSubMenuData } from './common';

import { API_BASE_URL } from 'config';
import { IPicturesPageProps, Stream } from 'types';
import { Api } from 'types/enums';
import { ICollegeImageProps } from 'ui-component/college-pictures-page/gallery-section';

//API for getPictures data
export const getPicturesData = async (collegeName: string, stream: string) => {
  const data: ICollegeImageProps = {
    hasError: false,
    collegeImagesData: {
      shortName: '',
      gallery: []
    }
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegePictures}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.collegeImagesData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getPicturePageData = async ({
  params,
  domain
}: {
  params: { name: string; ins: string };
  domain: string;
}): Promise<IPicturesPageProps> => {
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;

  const subMenuDataResponse = await getSubMenuData(params.name, stream);
  const bannerDataResponse = await getBannerData(params.name, stream);
  const pictureDataResponse = await getPicturesData(params.name, stream);
  const otherClgDataResponse = await getOtherCollegeData(params.name, stream);

  const data: IPicturesPageProps = {
    subMenu: subMenuDataResponse,
    bannerData: bannerDataResponse,
    otherCollegeData: otherClgDataResponse,
    collegeImagesData: pictureDataResponse
  };
  return data;
};
