import { API_BASE_URL } from 'config';
import { IPageParamsProps } from 'types';
import { Api } from 'types/enums';
import { IFreeAiProps } from 'ui-component/free-tool/future-ai-tool';
import { IcompareToolProps } from 'ui-component/free-tool/future-ai-tool/future-ai';
export const getcomparetoolData = async () => {
  const data: IcompareToolProps = {
    hasError: false,
    comparedToolData: {
      collegeData: [],
      course: [],
      caste: []
    }
  };

  try {
    const res = await fetch(`${API_BASE_URL}/${Api.futureAiTool}`);

    if (res.ok) {
      const response = await res.json();
      data.comparedToolData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};
export const getFreeAiToolData = async ({
  params,
  domain
}: {
  params: IPageParamsProps;
  domain: string;
}): Promise<IFreeAiProps> => {
  const comparedToolDataResponse = await getcomparetoolData();

  const data: IFreeAiProps = {
    comparedToolData: comparedToolDataResponse
  };
  return data;
};
