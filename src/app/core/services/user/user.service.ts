import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFollowResponse, IUnFollowResponse } from '@app/models/common.model';
import { IFolllowParams, IUnFolllowParams } from '@app/models/follower.model';
import {
  IPaginateUser,
  IPaginateUserFollowers,
  IPaginateUserFollowings,
  IPaginateUserTweets,
} from '@app/models/user.model';
import { apiConfig } from '@config/api.config';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}${
    environment.version ? `/${environment.version}` : ''
  }`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IPaginateUser> {
    const endpoint = 'users';
    const apiUrl = apiConfig(endpoint);
    return this.http.get<IPaginateUser>(apiUrl);
  }

  getTweets(id: number): Observable<IPaginateUserTweets> {
    const endpoint = 'users';
    const apiUrl = apiConfig(endpoint);
    return this.http.get<IPaginateUserTweets>(`${apiUrl}/${id}/tweets`);
  }

  getFollowers(id: number): Observable<IPaginateUserFollowers> {
    const endpoint = 'users';
    const apiUrl = apiConfig(endpoint);

    return this.http.get<IPaginateUserFollowers>(`${apiUrl}/${id}/followers`);
  }

  getFollowings(id: number): Observable<IPaginateUserFollowings> {
    const endpoint = 'users';
    const apiUrl = apiConfig(endpoint);
    return this.http.get<IPaginateUserFollowings>(`${apiUrl}/${id}/following`);
  }

  followUser(params: IFolllowParams): Observable<IFollowResponse> {
    const endpoint = 'follow';
    const apiUrl = apiConfig(endpoint);

    return this.http.post<any>(apiUrl, {
      user_id: params.user_id,
    });
  }

  unfollowUser(params: IUnFolllowParams): Observable<IUnFollowResponse> {
    const endpoint = 'unfollow';
    const apiUrl = apiConfig(endpoint);
    return this.http.post<any>(apiUrl, {
      user_id: params.user_id,
    });
  }
}
