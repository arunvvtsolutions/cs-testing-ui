import { API_BASE_URL } from 'config';
import { Api } from 'types/enums';
import { ISearchDataProps } from 'ui-component/home';

// get description data
export const getSearchData = async () => {
  const data: ISearchDataProps = {
    hasError: false,
    searchData: []
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${Api.searchColleges}`);

    if (res.ok) {
      const response = await res.json();
      data.searchData = response;
    }
  } catch (error) {
    data.hasError = true;
  }

  return data;
};
