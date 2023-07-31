import { IPaginate } from "./common.model"

export interface ITimeline {
  content: string
  id: number
  published: string
  user: IUser
}

interface IUser {
  active: boolean
  email: string
  id: number
  username: string
}


export interface IPaginateTimeline extends IPaginate {
  timeline: ITimeline[]
}
