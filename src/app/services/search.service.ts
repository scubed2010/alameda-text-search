import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ServiceResponse } from '../models/service-response';
import { TextSearchRequest } from '../models/text-search-request';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUrl = environment.production ? 'http://api.alameda.gov/' : 'https://localhost:7169/';

  constructor(private http: HttpClient) { }

  healthCheck() {
    return this.http.get<ServiceResponse>(this.baseUrl + 'HealthCheck');
  }

  searchText(request: TextSearchRequest) {
    return this.http.post<ServiceResponse>(this.baseUrl + 'TextSearch', request);
  }
}
