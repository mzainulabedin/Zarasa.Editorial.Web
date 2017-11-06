import {RequestOptionsArgs, Headers,  Http,  RequestOptions} from '@angular/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EntityResponse } from '../common/entity-response';


export abstract class EntityService {

  private baseUrl: string;
  constructor(protected http: Http, protected router: Router, protected authService: AuthService) {
    this.baseUrl = 'http://localhost:4444/';
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getJsonAuthHeader(): Headers {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.authService.token);
    return headers;
  }

  get(url: string, options?: RequestOptionsArgs): Observable<EntityResponse<any>> {
      return this.http.get(url, options)
      .map(response => response.json())
      .catch((error: any) => {
        if (error.status === 401) { this.router.navigate(['/login']); }
        return Observable.throw(error.json().message || 'Server error');
      });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<EntityResponse<any>> {
    // console.info(JSON.stringify(body));
    return this.http.post(url, JSON.stringify(body), options)
    .map(response => response.json())
    .catch((error: any) => {
      if (error.status === 401) { this.router.navigate(['/login']); }
      return Observable.throw(error.json() || 'Server error');
    });
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<EntityResponse<any>> {
    return this.http.put(url, JSON.stringify(body), options)
    .map(response => response.json())
    .catch((error: any) => {
      if (error.status === 401) { this.router.navigate(['/login']); }
      return Observable.throw(error.json().message || 'Server error');
    });
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<EntityResponse<any>> {
    return this.http.delete(url, options)
    .map(response => response.json())
    .catch((error: any) => {
      if (error.status === 401) { this.router.navigate(['/login']); }
      return Observable.throw(error.json().message || 'Server error');
    });
  }
}
