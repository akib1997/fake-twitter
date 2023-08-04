import { IFollower } from "./follower.model";

export interface IPaginateParams {
  page: number,
  size: number,
}

export interface IPaginateResponse {
  count: number
}
export interface IBaseUser {
  active: boolean;
  email: string;
  id: number;
  join_date: string;
  username: string;
}

export interface IFollowResponse {
  resp: string
}

export interface IUnFollowResponse extends IFollowResponse {

}
