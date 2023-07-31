import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = `${environment.apiUrl}${environment.version ? `/${environment.version}` : ''}/`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  followUser(userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${userId}/follow`, {});
  }

  unfollowUser(userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${userId}/unfollow`, {});
  }

}
