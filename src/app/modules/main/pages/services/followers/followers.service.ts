import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFollowerParams, IPaginateFollower } from '@app/models/follower.model';
import { apiConfig } from '@config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FollowersService {

  constructor(private http: HttpClient) {}

  getFollowers(paginateParams?: IFollowerParams): Observable<IPaginateFollower> {
    const endpoint = 'followers';
    const apiUrl = apiConfig(endpoint);
    const { page, size } = paginateParams!;
    const params = new HttpParams().set('page', page).set('size', size);

    return this.http.get<IPaginateFollower>(apiUrl, {params});
  }
}
