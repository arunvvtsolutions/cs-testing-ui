import { Api } from 'types/enums';
import { IQuestionAnsDataProps } from 'ui-component/dashboard/question-answer';
import { ICollegeReviewsDataProps } from 'ui-component/dashboard/review-page';
import { IShortListedPostProps, IStudentProfileProps } from 'types';
import { IRelatedCompareProps } from 'ui-component/dashboard/compare-history-page';
import { IBookmarkDataProps } from 'types';
import axios from 'utils/axios';
import { API_BASE_URL } from 'config';
export const getStudentQuesAndAns = async (studentId: string) => {
  const data: IQuestionAnsDataProps = {
    hasError: false,
    userQuestionAnswer: []
  };
  try {
    const res = await fetch(`/${Api.studentsQuesAndAns}/${studentId}`);

    if (res.ok) {
      const result = await res.json();
      data.userQuestionAnswer = result;
    }
  } catch (error) {}
  return data;
};
export const getStudentReviews = async (studentId: string) => {
  const data: ICollegeReviewsDataProps = {
    hasError: false,
    collegeReviews: []
  };
  try {
    const res = await fetch(`/api/student-dashboard/reviews-api/${studentId}`);

    if (res.ok) {
      const result = await res.json();
      data.collegeReviews = result;
    }
  } catch (err) {}
  return data;
};

// API to get compare-history-list
export const getCompareHistoryListData = async (studentId: string) => {
  const data: IRelatedCompareProps = {
    hasError: false,
    comparedCollegeData: []
  };

  try {
    const res = await fetch(`/${Api.compareHistoryApi}/${studentId}`);

    if (res.ok) {
      const response = await res.json();
      data.comparedCollegeData = response;
    }
  } catch (error) {
    data.hasError = true;
  }
  return data;
};

// Remove Compare-histoty-List

export const removeCompare = async (historyId: number, stream: string) => {
  try {
    const res = await fetch(`${Api.compareHistoryApi}/${JSON.stringify(historyId)}`, {
      method: 'PATCH',
      body: JSON.stringify({ historyId, stream })
    });

    if (res.ok) {
      return { status: 1 };
    } else return { status: 0 };
  } catch (error) {
    return { status: 0 };
  }
};

export const getStudentBookMark = async (studentId: number) => {
  try {
    const res = await fetch(`/api/studentbookmark-api?studentId=${studentId}`);

    if (res.ok) {
      const result = await res.json();
      const data: IBookmarkDataProps[] = result;
      return data;
    }
  } catch (error) {}
};

export const postStudentBookMark = async (studentId: number, collegeId: number, stream: string) => {
  try {
    const res = await fetch(`/api/studentbookmark-api`, {
      method: 'post',
      body: JSON.stringify({ studentId, collegeId, stream })
    });

    if (res.ok) {
      const result = await res.json();
      return result;
    }
  } catch (error) {}
};

export const putStudentBookMark = async (studentId: number, shortUrl: string, stream: string) => {
  try {
    const res = await fetch(`/api/studentbookmark-api`, {
      method: 'put',
      body: JSON.stringify({ studentId, shortUrl, stream })
    });

    if (res.ok) {
      const result = await res.json();
      return result;
    }
  } catch (error) {}
};
// collegeReviewData api
export const postStudentProfileData = async (studentData: IStudentProfileProps) => {
  try {
    const res = await fetch(`/api/student-dashboard/profile-api/${studentData.studentId}`, {
      method: 'POST',
      body: JSON.stringify(studentData)
    });

    if (res.ok) {
      const result = await res.json();
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const getStudentProfileData = async (studentId: string | number | undefined) => {
  try {
    const res = await fetch(`/api/student-dashboard/profile-api/${studentId}`);

    if (res.ok) {
      const result = await res.json();
      return result;
    }
  } catch (error) {
    return error;
  }
};

export const postStudentProfileUpload = async (pictureData: FormData) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/${Api.dashboardMulterUpload}`, pictureData);
    return res.data;
  } catch (error) {
    return error;
  }
};

//dashboard -shortlisted college
export const getShortListedCollegeData = async (studentId: string | number | undefined) => {
  try {
    const res = await fetch(`/api/student-dashboard/shortlisted-college-api/${studentId}`);

    if (res.ok) {
      const result = await res.json();
      return result;
    }
  } catch (error) {
    return error;
  }
};
export const postShortlistedData = async (shortlistedData: IShortListedPostProps) => {
  try {
    const res = await fetch(`/api/student-dashboard/shortlisted-college-api/${shortlistedData.studentId}`, {
      method: 'put',
      body: JSON.stringify(shortlistedData)
    });

    if (res.ok) {
      const result = await res.json();
      return result;
    }
  } catch (error) {
    return error;
  }
};
