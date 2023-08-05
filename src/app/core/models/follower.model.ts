import { IPaginateParams, IPaginateResponse } from "./common.model";

export interface IFollower {
  active: boolean;
  email: string;
  id: number;
  join_date: string;
  username: string;
}

export interface IFollowerParams extends IPaginateParams {}
export interface IPaginateFollower extends IPaginateResponse {
  followers: IFollower[]
}

export interface IFolllowParams {
  user_id: number
}

export interface IUnFolllowParams extends IFolllowParams {

}
