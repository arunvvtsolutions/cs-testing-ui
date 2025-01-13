// types
import { ICollege } from './college';

import { HandleFunction } from 'types';

export type ProfileProgress = {
  label: string;
  variant: string;
  value: number;
};

export type UserProfile = {
  id?: string;
  image?: string;
  name?: string;
  lastname?: string;
  email?: string;
  mobile?: string;
  stream?: string;
  chatbotAgent?: number | null;
  activeStatus?: number;
  avatar?: string;
  role?: string;
  about?: string;
  work_email?: string;
  personal_email?: string;
  work_phone?: string;
  personal_phone?: string;
  birthdayText?: string;
  lastMessage?: string;
  status?: string;
  friends?: number;
  followers?: number;
  contact?: string;
  company?: string;
  location?: string;
  online_status?: string;
  unReadChatCount?: number;
  groups?: Group[];
  time?: string;
  tier?: string;
  Progress?: ProfileProgress;
};

export type Profile = {
  id: string;
  avatar: string;
  name: string;
  time: string;
};

export type PostImage = {
  img: string;
  featured?: boolean;
  title?: string;
};

export type Likes = {
  like: boolean;
  value: number;
};

export type Group = {
  id: string;
  avatar: string;
  name: string;
};

export type Reply = {
  id: string;
  profile: Profile;
  data: CommentData;
};

export type CommentData = {
  name?: string;
  comment?: string;
  likes?: Likes;
  video?: string;
  replies?: Reply[];
};

export type PostData = {
  id?: string;
  content: string;
  images: PostImage[];
  video?: string;
  likes: Likes;
  comments?: Comment[];
};
export type Comment = {
  id: string;
  profile: Profile;
  data?: CommentData;
};
export type Post = {
  id?: string;
  profile: Profile;
  data: PostData;
};

export type PostDataType = { id: string; data: PostData; profile: Profile };

export interface PostProps {
  commentAdd: (s: string, c: Reply) => Promise<void>;
  handleCommentLikes: HandleFunction;
  editPost?: HandleFunction;
  renderPost?: HandleFunction;
  setPosts?: React.Dispatch<React.SetStateAction<PostDataType[]>>;
  handlePostLikes: (s: string) => Promise<void>;
  handleReplayLikes: (postId: string, commentId: string, replayId: string) => Promise<void>;
  post: PostDataType;
  replyAdd: (postId: string, commentId: string, reply: Reply) => Promise<void>;
}

type StudentDataProps = {
  id: number;
  name: string;
  lastname: null | string;
  gender: null | string;
  dob: null | string;
  email: string;
  mobile: string;
  postalcode: null | string;
  area: null | string;
  city: null | string;
  otp: number;
  active: null | number;
  emailVerifiedAt: null | string;
  password: null | string;
  token: null | string;
  status: number;
  phoneStatus: number;
  emailStatus: number;
  createdAt: string;
  updatedAt: string;
};

export interface StudentProfileProps {
  studentData: StudentDataProps | null;
  comparedColleges: ICollege[];
  error: boolean;
}
