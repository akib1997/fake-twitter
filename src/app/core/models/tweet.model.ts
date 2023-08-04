import { IPaginateParams, IPaginateResponse } from './common.model';
import { IUser } from './user.model';

export interface ITweet {
  content: string
  id: number
  published: string
  user: IUser
}

export interface ITweetParams extends IPaginateParams {}

export interface IPaginateITweet extends IPaginateResponse {
  my_tweets: ITweet[]
}

export interface ITweetResponse {
  message: string
  tweet: ITweet
}
