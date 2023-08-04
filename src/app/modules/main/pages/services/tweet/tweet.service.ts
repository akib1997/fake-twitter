import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPaginateITweet, ITweetParams, ITweetResponse } from '@app/models/tweet.model';
import { ITeweetRequest } from '@app/models/user.model';
import { Observable } from 'rxjs';
import { apiConfig } from '@config/api.config';

@Injectable({
  providedIn: 'root',
})
export class TweetService {

  constructor(private http: HttpClient) {}

  tweet(request: ITeweetRequest): Observable<ITweetResponse> {
    const endpoint = 'tweet';
    const apiUrl = apiConfig(endpoint);
    return this.http.post<ITweetResponse>(apiUrl, request);
  }

  getTweets(paginateParams?: ITweetParams): Observable<IPaginateITweet> {
    const endpoint = 'my-tweets';
    const apiUrl = apiConfig(endpoint);
    const { page, size } = paginateParams!;
    const params = new HttpParams().set('page', page).set('size', size);

    return this.http.get<IPaginateITweet>(apiUrl, {params});
  }
}
