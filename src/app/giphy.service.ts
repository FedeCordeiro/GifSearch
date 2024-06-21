import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  apiKey = 'e5V4dUzOCpRf9B2VH95El1DsIxUsyzCk';
  apiUrl = 'https://api.giphy.com/v1/gifs/search';

  constructor(private http: HttpClient) { }

  searchGifs(query: string, limit: number, offset: number): Observable<any> {
    const params = {
      api_key: this.apiKey,
      q: query,
      limit: limit.toString(),
      offset: offset.toString()
    };
    return this.http.get<any>(this.apiUrl, { params });
  }
}

