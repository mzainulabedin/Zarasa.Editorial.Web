import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Headers} from '@angular/http';
// Import RxJs required methods
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { EntityResponse } from '../common/entity-response';
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { EntityService } from './entity.service';



@Injectable()
export class UserService extends EntityService {

  constructor(private http: Http, private router: Router, private authService: AuthService) {
     super(http, router, authService);
  }

    getUsers(): Observable<EntityResponse<User[]>> {
        return this.get(this.getBaseUrl() + 'api/user')
        .map(response => response)
        .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
    }

    getUser(id: number): Observable<EntityResponse<User>> {
        const options = new RequestOptions({ headers: this.getJsonAuthHeader() });
        return this.get(this.getBaseUrl() + 'api/user/' + id, options)
        .map(response => response)
        .catch((error: any) => {
          return Observable.throw(error);
        });
    }

    // getUser(id: number): Observable<EntityResponse<User>> {
    //   const headers: Headers = new Headers();
    //   headers.append('Content-Type', 'application/json');
    //   headers.append('Authorization', 'Bearer ' + this.authService.token);
    //   const options = new RequestOptions({ headers: headers });

    //     return this.http.get(this.baseUrl + 'api/user/' + id, options)
    //     .map(response => response.json())
    //     .catch((error: any) => {
    //       if (error.status === 401) { this.router.navigate(['/login']); }
    //       return Observable.throw(error.json().message || 'Server error');
    //     });
    // }

    insert(user: User): Observable<EntityResponse<User>> {
        // if(user == null) console.info("user not exits"); else console.info(JSON.stringify(user));
        const header = new Headers({ 'Content-Type': 'application/json' });

        const options = new RequestOptions({ headers: header });
        return this.http.post(this.getBaseUrl() + `api/user/`, JSON.stringify(user), options)
        .map(response => response.json())
        .catch((error: any) => Observable.throw(error.json() || 'Server error'));
        // return new Observable<User>();
    }

    update(user: User): Observable<EntityResponse<User>> {
        const header = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: header });
        return this.http.put(this.getBaseUrl() + `api/user/` + user.id, JSON.stringify(user), options)
        .map(response => response.json())
        .catch(error => Observable.throw(error.json() || 'Server error'));

        // return new Observable<User>();
    }

    delete(id: number): Observable<EntityResponse<User>> {
      const header = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ headers: header });
      return this.http.delete(this.getBaseUrl() + `api/user/` + id, options)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json() || 'Server error'));
    }


}
