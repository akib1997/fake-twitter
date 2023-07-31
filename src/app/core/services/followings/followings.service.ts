import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPaginateFollowings } from '@app/models/following.model';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FollowingsService {
  private readonly apiUrl = `${environment.apiUrl}${environment.version ? `/${environment.version}` : ''}/following`;


  constructor(private http: HttpClient) {}

  getFollowingUsers(): Observable<IPaginateFollowings> {
    return this.http.get<IPaginateFollowings>(this.apiUrl);
  }
}
