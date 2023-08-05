import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISearchResponse } from '@app/models/search.model';
import { apiConfig } from '@config/api.config';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  search(token: string): Observable<ISearchResponse> {
    const endpoint = 'search';
    const apiUrl = apiConfig(endpoint);

    return this.http.post<ISearchResponse>(apiUrl, { token }).pipe(
      debounceTime(2000), // Wait for 2000ms (2 seconds) before making the API call.
      distinctUntilChanged()
    );
  }
}
