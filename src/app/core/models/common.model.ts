import { IFollower } from "./follower.model";

export interface IPaginate {
  page: number,
  size: number
}

export interface IBaseUser {
  active: boolean;
  email: string;
  id: number;
  join_date: string;
  username: string;
}
