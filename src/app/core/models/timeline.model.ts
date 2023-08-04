import {  IPaginateParams, IPaginateResponse, } from "./common.model"
import { ITweet } from "./tweet.model"

export interface ITimeline extends ITweet {}

export interface ITimelineParams extends IPaginateParams {}


export interface IPaginateTimeline extends IPaginateResponse {
  timeline: ITimeline[]
}
