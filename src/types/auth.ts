// project imports
import { UserProfile } from 'types/user-profile';
import { ISignUpProps } from 'ui-component/signup';

export interface JWTData {
  userId: string;
}

type authResponse = {
  message: string;
  status: number;
};

export type JWTContextType = {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
  logout: () => void;
  login: (email: string, password: string) => Promise<authResponse>;
  register: (studentData: ISignUpProps) => Promise<authResponse>;
  updateProfile: (userData: UserProfile) => Promise<void>;
  // resetPassword: (email: string) => Promise<void>;
};

export interface InitialLoginContextProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
}
