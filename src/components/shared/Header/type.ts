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

type addressType = {
  addressLine1:string;
  addressLine2:string;
  city:string;
  state:string;
  country:string;
  zipCode:string;
}