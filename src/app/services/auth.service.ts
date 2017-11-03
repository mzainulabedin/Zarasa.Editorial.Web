import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
// import 'rxjs/add/operator/toPromise';

import {Headers} from '@angular/http';
// Import RxJs required methods
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { EntityResponse } from '../common/entity-response';
// import { User } from '../models/user';
// import { LoginCredential } from '../models/login.credential';


@Injectable()
export class AuthService {
    public token: string;
    private baseUrl: string;

    constructor(private http: Http) {
      this.baseUrl = 'http://localhost:4444/';
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.token = currentUser && currentUser.token;
    }
    login(email: string, password: string): Observable<EntityResponse<any>> {
        const header = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: header });
        return this.http.post(this.baseUrl + `api/account/sign-in`, JSON.stringify({ username: email, password: password }), options)
        .map((response: Response) => {
          // response.json();
          const entityResponse: EntityResponse<any> = response.json();
          if (entityResponse && entityResponse.data.access_token) {
              this.token = entityResponse.data.access_token;
              // store username and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify({ username: email, token: this.token }));
          }
          return entityResponse;
        })
        .catch(error => Observable.throw(error.json() || 'Server error'));
    }

    logout(): void {
      // clear token remove user from local storage to log user out
      this.token = null;
      localStorage.removeItem('currentUser');
    }

}
