import type { addressType } from "../../pages/Auth/type";

export type userType = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  playList: string[];
  _id: string;
  profilePic?: string;
  address?: addressType;
};


export type navListType = {
  name: string;
  path: string;
};
