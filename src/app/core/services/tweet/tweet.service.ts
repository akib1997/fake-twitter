import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPaginateITweet } from '@app/models/tweet.model';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  private readonly apiUrl = `${environment.apiUrl}/${environment.version}/my-tweets`;

  constructor(private http: HttpClient) {}

  getTweets(): Observable<IPaginateITweet> {
    return this.http.get<IPaginateITweet>(this.apiUrl);
  }
}
