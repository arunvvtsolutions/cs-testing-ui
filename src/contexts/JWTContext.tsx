/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/order */
'use client';

import React, { createContext, useEffect, useReducer } from 'react';

// third-party
// import { Chance } from 'chance';
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT, UPDATE_PROFILE } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
// types
import { JWTContextType } from 'types/auth';
import { InitialLoginContextProps, KeyedObject } from 'types';
import { handlSubmitOtp, postSignUp } from 'utils/api/authentication';
import { useRouter } from 'next/navigation';
import { ISignUpProps } from 'ui-component/signup';
import { useDispatch } from 'store';
import { getUserData } from 'utils/api/common';
import { UserProfile } from 'types/user-profile';
import { getpredictorFormData } from 'utils/api/neet-predictor';
import { getNeetPredictorFormData } from 'store/slices/predictor';
import { getLoginNumber } from 'store/slices/auth';
import { API_BASE_URL, BASE_URL_NAME } from 'config';
import { getCookieToken } from 'utils';
import { Api } from 'types/enums';

// const chance = new Chance();

// constant
export const initialState: InitialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken: (st: string) => boolean = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  const decoded: KeyedObject = jwtDecode(serviceToken);
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken?: string | null) => {
  if (serviceToken) {
    // setting cookies for domains and subdomains
    document.cookie = `serviceToken=${serviceToken}; domain=.${BASE_URL_NAME}; path=/;`;
  } else {
    document.cookie = `serviceToken=${null}; domain=.${BASE_URL_NAME}; path=/;`;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);
  const storeDispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = getCookieToken();

        if (serviceToken && verifyToken(serviceToken)) {
          const userData = await getUserData();
          await getNeetPredictorData(userData.id);
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user: {
                ...userData,
                image: `${API_BASE_URL}/${Api.profileImage}/${userData.image}`
              }
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        dispatch({
          type: LOGOUT
        });
      }
    };
    init();
  }, []);

  const login = async (otp: string, signInByMobile: string) => {
    try {
      const response = await handlSubmitOtp(otp, signInByMobile);
      const { accessToken, userData, status } = response;

      if (status === 1) {
        setSession(accessToken);
        dispatch({
          type: LOGIN,
          payload: {
            isLoggedIn: true,
            user: userData
          }
        });
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (userData: UserProfile) => {
    dispatch({
      type: UPDATE_PROFILE,
      payload: {
        isLoggedIn: true,
        user: userData
      }
    });
  };
  const getNeetPredictorData = async (studentId: string) => {
    const response = await getpredictorFormData(studentId);

    if (response[0]) {
      storeDispatch(
        getNeetPredictorFormData({
          rank: response[0].neetRank,
          ...response[0],
          stateId: response[0].state
        })
      );
    }
  };
  const register = async (signUpData: ISignUpProps) => {
    try {
      const response = await postSignUp(signUpData);

      if (response.status === 1) {
        storeDispatch(getLoginNumber(String(response.mobileNo)));
        router.push('/verify-otp');
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <JWTContext.Provider value={{ ...state, login, logout, register, updateProfile }}>{children}</JWTContext.Provider>
  );
};

export default JWTContext;
