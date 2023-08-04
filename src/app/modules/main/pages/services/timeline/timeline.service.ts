import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPaginateTimeline, ITimelineParams } from '@app/models/timeline.model';
import { apiConfig } from '@config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimelineService {
  constructor(private http: HttpClient) {}

  getTimeline(paginateParams?: ITimelineParams): Observable<IPaginateTimeline> {
    const endpoint = 'timeline';
    const apiUrl = apiConfig(endpoint);
    const { page, size } = paginateParams!;
    const params = new HttpParams().set('page', page).set('size', size);

    return this.http.get<IPaginateTimeline>(apiUrl, { params });
  }
}
