
export interface AuthenticationToken {
  id: string,
  role: string
};
export enum USER_TYPE {
  NORMAL = "normal",
  ADMIN = "admin"
};

export type TUser = {
  id: string,
  name: string,
  role: string ,
  email: string,
  password: string
};

export interface UserInputDTO {
  name: string,
  role: string,
  email: string,
  password: string
};

export type UserProfileOutput = {
  id: string,
  name: string,
  email: string,
};
// -- -- -- -- // -- -- -- -- // -- -- //
export interface LoginInputDTO {
  email: string,
  password: string
}