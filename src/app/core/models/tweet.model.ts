import { IPaginate } from './common.model';
import { ITimeline } from './timeline.model';

export interface ITweet extends ITimeline {}

export interface IPaginateITweet extends IPaginate {
  my_tweets: ITweet[]
}
