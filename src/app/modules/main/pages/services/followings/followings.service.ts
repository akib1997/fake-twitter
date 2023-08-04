import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFollowingParams, IPaginateFollowings } from '@app/models/following.model';
import { apiConfig } from '@config/api.config';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FollowingsService {

  constructor(private http: HttpClient) {}

  getFollowingUsers(paginateParams?: IFollowingParams): Observable<IPaginateFollowings> {
    const endpoint = 'following';
    const apiUrl = apiConfig(endpoint);
    const { page, size } = paginateParams!;
    const params = new HttpParams().set('page', page).set('size', size);

    return this.http.get<IPaginateFollowings>(apiUrl, {params});
  }
}
