import { IPaginate, } from "./common.model"
import { IUser } from "./user.model"

export interface ITimeline {
  content: string
  id: number
  published: string
  user: IUser
}



export interface IPaginateTimeline extends IPaginate {
  timeline: ITimeline[]
}
