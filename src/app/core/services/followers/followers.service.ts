import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPaginateFollower } from '@app/models/follower.model';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FollowersService {
  private readonly apiUrl = `${environment.apiUrl}/${environment.version}/followers`;

  constructor(private http: HttpClient) {}

  getFollowers(): Observable<IPaginateFollower> {
    return this.http.get<IPaginateFollower>(this.apiUrl);
  }
}
