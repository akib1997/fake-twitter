import { IBaseUser, IPaginate } from "./common.model"
import { IFollower } from "./follower.model"
import { ITweet } from "./tweet.model"

export interface IUser extends IBaseUser {

}

export interface IPaginateUser extends IPaginate {
  users: IUser[]
}

export interface IPaginateUserTweets extends IPaginate {
  tweets: ITweet[]
}

export interface IPaginateUserFollowers extends IPaginate {
  followers: IFollower[]
}

export interface IPaginateUserFollowings extends IPaginate {
  followings: IFollower[]
}

