import {RequestOptionsArgs, Headers,  Http,  RequestOptions} from '@angular/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EntityResponse } from '../../common/responses/entity-response';
import { EntityListResponse } from '../../common/responses/entity-list-response';


export abstract class EntityService<T> {

  private baseUrl: string;
  constructor(protected http: Http, protected router: Router, protected authService: AuthService = null) {
    this.baseUrl = 'http://localhost:4100/';
  }


  getBaseUrl(): string {
    return this.baseUrl;
  }

  getJsonHeader(): Headers {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  getJsonAuthHeader(): Headers {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authService.token);
    return headers;
  }

  getList(url: string, options?: RequestOptionsArgs): Observable<EntityListResponse<T>> {
    return this.http.get(url, options)
    .map(response => response.json())
    .catch((error: any) => {
      if (error.status === 401) { this.router.navigate(['/login']); }
      return Observable.throw(error.json().message || 'Server error');
    });
  }

  get(url: string, options?: RequestOptionsArgs): Observable<EntityResponse<T>> {
      return this.http.get(url, options)
      .map(response => response.json())
      .catch((error: any) => {
        if (error.status === 401) { this.router.navigate(['/login']); }
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  post(url: string, body: T, options?: RequestOptionsArgs): Observable<EntityResponse<T>> {
    // console.info(JSON.stringify(body));
    return this.http.post(url, JSON.stringify(body), options)
    .map(response => response.json())
    .catch((error: any) => {
      if (error.status === 401) { this.router.navigate(['/login']); }
      return Observable.throw(error.json() || 'Server error');
    });
  }

  put(url: string, body: T, options?: RequestOptionsArgs): Observable<EntityResponse<T>> {
    return this.http.put(url, JSON.stringify(body), options)
    .map(response => response.json())
    .catch((error: any) => {
      if (error.status === 401) { this.router.navigate(['/login']); }
      return Observable.throw(error.json().message || 'Server error');
    });
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<EntityResponse<T>> {
    return this.http.delete(url, options)
    .map(response => response.json())
    .catch((error: any) => {
      if (error.status === 401) { this.router.navigate(['/login']); }
      return Observable.throw(error.json().message || 'Server error');
    });
  }
}
