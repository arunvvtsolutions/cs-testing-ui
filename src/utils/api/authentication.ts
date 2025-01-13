import { AuthenticationConstants } from '../../constants';

import { Api } from 'types/enums';
import { ISignUpProps } from 'ui-component/signup';

const { MOBILENUMBERPREFIX } = AuthenticationConstants;

export const postSignUp = async (values: ISignUpProps) => {
  try {
    const result = await fetch('/api/signup-api', {
      method: 'post',
      body: JSON.stringify({
        ...values,
        userMobile: MOBILENUMBERPREFIX + values.userMobile
      })
    });
    const res = await result.json();
    return res;
  } catch (error) {
    console.log(error);

    throw error;
  }
};

export const getSignIn = async (mobileNo: string) => {
  try {
    const result = await fetch(`/${Api.signIn}?mobileNo=${MOBILENUMBERPREFIX + mobileNo}`);
    const res = await result.json();
    return res;
  } catch (error) {
    throw error;
  }
};

export const handlSubmitOtp = async (otpNumber: string, mobileNo: string) => {
  try {
    const result = await fetch(`/api/verifyotp-api?otpNumber=${otpNumber}&mobileNo=${mobileNo}`);
    const res = await result.json();
    return res;
  } catch (error) {
    throw error;
  }
};

export const handlResendOtp = async (mobileNo: string) => {
  const result = await fetch(`/api/resendotp-api?mobileNo=${mobileNo}`);
  const res = await result.json();
  return res;
};
