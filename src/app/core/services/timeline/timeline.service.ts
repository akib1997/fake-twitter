import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPaginateTimeline } from '@app/models/timeline.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TimelineService {
 private readonly apiUrl = `${environment.apiUrl}/${environment.version}/timeline`;

  constructor(private http: HttpClient) {}

  getTimeline(): Observable<IPaginateTimeline> {
    return this.http.get<IPaginateTimeline>(this.apiUrl);
  }
}
