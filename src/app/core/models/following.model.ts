import { IPaginate } from "./common.model";
import { IFollower } from "./follower.model";

export interface IFollowing extends IFollower {

}

export interface IPaginateFollowings extends IPaginate {
  followings: IFollowing[]
}
