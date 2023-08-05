import { IBaseUser, IPaginateParams, IPaginateResponse } from "./common.model"
import { IFollower } from "./follower.model"
import { ITweet } from "./tweet.model"

export interface IUser extends IBaseUser {
}

export interface IUsersParams extends IPaginateParams {

}

export interface IPaginateUser extends IPaginateResponse {
  users: IUser[]
}

export interface IPaginateUserTweets extends IPaginateResponse {
  tweets: ITweet[]
}

export interface IPaginateUserFollowers extends IPaginateResponse {
  followers: IFollower[]
}

export interface IPaginateUserFollowings extends IPaginateResponse {
  followings: IFollower[]
}

export interface ITeweetRequest {
  content: string
}
