import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFolllowParams, IUnFolllowParams } from '@app/models/follower.model';
import { IPaginateUser, IPaginateUserFollowers, IPaginateUserFollowings, IPaginateUserTweets } from '@app/models/user.model';
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
    return this.http.get<IPaginateUser>(`${this.apiUrl}/users`);
  }

  getTweets(id: number): Observable<IPaginateUserTweets> {
    return this.http.get<IPaginateUserTweets>(`${this.apiUrl}/users/${id}/tweets`);
  }

  getFollowers(id: number): Observable<IPaginateUserFollowers> {
    return this.http.get<IPaginateUserFollowers>(`${this.apiUrl}/users/${id}/followers`);
  }

  getFollowings(id: number): Observable<IPaginateUserFollowings> {
    return this.http.get<IPaginateUserFollowings>(`${this.apiUrl}/users/${id}/following`);
  }

  followUser(params: IFolllowParams): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/follow`, {
      user_id: params.user_id,
    });
  }

  unfollowUser(params: IUnFolllowParams): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/unfollow`, {
      user_id: params.user_id,
    });
  }
}
