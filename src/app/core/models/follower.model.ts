import { IPaginate } from "./common.model";

export interface IFollower {
  active: boolean;
  email: string;
  id: number;
  join_date: string;
  username: string;
}

export interface IPaginateFollower extends IPaginate {
  followers: IFollower[]
}
