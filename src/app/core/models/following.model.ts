
import { IPaginateParams, IPaginateResponse } from "./common.model";
import { IFollower } from "./follower.model";

export interface IFollowing extends IFollower {

}

export interface IFollowingParams extends IPaginateParams {}

export interface IPaginateFollowings extends IPaginateResponse {
  followings: IFollowing[]
}
