import { getBannerData, getSubMenuData } from './common';

import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
import { ICollegeProps } from 'ui-component/college-affiliated-page/college-list';
import { IAffiliatedCollegeProps, Stream } from 'types';

/*API to get affiliated college  */
export const getAffiliatedData = async (collegeName: string, stream: string) => {
  const data: ICollegeProps = {
    hasError: false,
    collegeData: []
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.collegeAffiliatedList}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.collegeData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getAffiliatedCollegeData = async ({
  params,
  domain
}: {
  params: { name: string; ins: string };
  domain: string;
}): Promise<IAffiliatedCollegeProps> => {
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;

  const subMenuDataResponse = await getSubMenuData(params.name, stream);
  const affiliatedDataResponse = await getAffiliatedData(params.name, stream);
  const bannerDataResponse = await getBannerData(params.name, stream);

  const data: IAffiliatedCollegeProps = {
    collegeData: affiliatedDataResponse,
    bannerData: bannerDataResponse,
    subMenu: subMenuDataResponse
  };

  return data;
};
