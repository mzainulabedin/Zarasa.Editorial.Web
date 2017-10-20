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



@Injectable()
export class UserService {
    // private result : Observable<User[]>;
    private baseUrl: string;
    constructor(private http: Http) {
      this.baseUrl = 'http://localhost:4444/';
    }

    getUsers(): Observable<EntityResponse<User[]>> {
        return this.http.get(this.baseUrl + 'api/user')
        .map(response => response.json())
        .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
    }

    getUser(id: number): Observable<EntityResponse<User>> {
        return this.http.get(this.baseUrl + 'api/user/' + id)
        .map(response => response.json())
        .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
    }

    insert(user: User): Observable<EntityResponse<User>> {
        // if(user == null) console.info("user not exits"); else console.info(JSON.stringify(user));
        const header = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: header });
        return this.http.post(this.baseUrl + `api/user/`, JSON.stringify(user), options)
        .map(response => response.json())
        .catch((error: any) => Observable.throw(error.json() || 'Server error'));
        // return new Observable<User>();
    }

    update(user: User): Observable<EntityResponse<User>> {
        const header = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: header });
        return this.http.put(this.baseUrl + `api/user/` + user.id, JSON.stringify(user), options)
        .map(response => response.json())
        .catch(error => Observable.throw(error.json() || 'Server error'));

        // return new Observable<User>();
    }

    delete(id: number): Observable<EntityResponse<User>> {
      const header = new Headers({ 'Content-Type': 'application/json' });
      const options = new RequestOptions({ headers: header });
      return this.http.delete(this.baseUrl + `api/user/` + id, options)
      .map(response => response.json())
      .catch(error => Observable.throw(error.json() || 'Server error'));
    }
}
