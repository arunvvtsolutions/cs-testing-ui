import { API_BASE_URL } from 'config';
import { IContactusPageProps, Stream } from 'types';
import { Api } from 'types/enums';
import { IContactProps } from 'ui-component/college-contact-page/contact-details';
import { IMapProps } from 'ui-component/college-contact-page/map-section';
import { INearByProps } from 'ui-component/college-contact-page/nearby-section';
import { getBannerData, getSubMenuData } from 'utils/api/common';

/*API to get contactDetails*/

export const getContactDetailsData = async (collegeName: string, stream: string) => {
  const data: IContactProps = {
    hasError: false,
    contactData: {
      shortName: '',
      address: '',
      telephone: '',
      website: '',
      mail: '',
      faceBook: '',
      instaGram: '',
      youTube: '',
      linkedIn: ''
    }
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.contactDetails}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.contactData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getNearByData = async (collegeName: string, stream: string) => {
  const data: INearByProps = {
    hasError: false,
    nearByData: {
      busStand: '',
      busStandDistance: '',
      railway: '',
      railwayDistance: '',
      airport: '',
      airportDistance: ''
    }
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.getNearByDetails}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.nearByData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getMapData = async (collegeName: string, stream: string) => {
  const data: IMapProps = {
    hasError: false,
    mapData: {
      url: ''
    }
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${stream}/${Api.getMap}/${collegeName}`);

    if (res.ok) {
      const response = await res.json();
      data.mapData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

export const getContactPageData = async ({
  params,
  domain
}: {
  params: { name: string; ins: string };
  domain: string;
}): Promise<IContactusPageProps> => {
  const stream = domain.includes(Stream.ENGINEERING) ? Stream.ENGINEERING : Stream.MEDICAL;

  const subMenuDataResponse = await getSubMenuData(params.name, stream);
  const bannerDataResponse = await getBannerData(params.name, stream);
  const contactDetailDataResponse = await getContactDetailsData(params.name, stream);
  const nearByDataResponse = await getNearByData(params.name, stream);
  const mapDataResponse = await getMapData(params.name, stream);

  const data: IContactusPageProps = {
    subMenu: subMenuDataResponse,
    bannerData: bannerDataResponse,
    contactData: contactDetailDataResponse,
    nearByData: nearByDataResponse,
    mapData: mapDataResponse
  };
  return data;
};
