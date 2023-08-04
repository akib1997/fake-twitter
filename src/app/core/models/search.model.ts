import { IUser } from "./user.model"

export interface ISearchResponse {
  count: number
  search_results: IUser[]
}
