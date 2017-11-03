import {RequestOptionsArgs, Headers,  Http,  RequestOptions} from '@angular/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EntityResponse } from '../common/entity-response';


export abstract class EntityService {

  private baseUrl: string;
  constructor(private http1: Http, private router1: Router, private authService1: AuthService) {
    this.baseUrl = 'http://localhost:4444/';
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getJsonAuthHeader(): Headers {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authService1.token);
    return headers;
  }

  get(url: string, options?: RequestOptionsArgs): Observable<EntityResponse<any>> {
      return this.http1.get(url, options)
      .map(response => response.json())
      .catch((error: any) => {
        if (error.status === 401) { this.router1.navigate(['/login']); }
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<EntityResponse<any>> {
    return this.http1.post(url, JSON.stringify(body), options)
    .map(response => response.json())
    .catch((error: any) => {
      if (error.status === 401) { this.router1.navigate(['/login']); }
      return Observable.throw(error.json().message || 'Server error');
    });
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<EntityResponse<any>> {
    return this.http1.put(url, JSON.stringify(body), options)
    .map(response => response.json())
    .catch((error: any) => {
      if (error.status === 401) { this.router1.navigate(['/login']); }
      return Observable.throw(error.json().message || 'Server error');
    });
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<EntityResponse<any>> {
    return this.http1.delete(url, options)
    .map(response => response.json())
    .catch((error: any) => {
      if (error.status === 401) { this.router1.navigate(['/login']); }
      return Observable.throw(error.json().message || 'Server error');
    });
  }
}
