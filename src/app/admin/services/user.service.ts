import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Headers} from '@angular/http';
// Import RxJs required methods
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { EntityResponse } from '../../common/entity-response';
import { User } from '../models/user';

import { Router } from '@angular/router';
import { EntityService } from '../../services/entity.service';
import { AuthService } from '../../services/auth.service';




@Injectable()
export class UserService extends EntityService<User> {

  constructor(protected http: Http, protected router: Router, protected authService: AuthService) {
    super(http, router, authService);
  }


    getUsers(): Observable<EntityResponse<User[]>> {
      const options = new RequestOptions({ headers: this.getJsonAuthHeader() });
        return this.get(this.getBaseUrl() + 'api/user', options)
        .map(response => response)
        .catch((error: any) => Observable.throw(error.json().message || 'Server error'));
    }

    getUser(id: number): Observable<EntityResponse<User>> {
        const options = new RequestOptions({ headers: this.getJsonAuthHeader() });
        return this.get(this.getBaseUrl() + 'api/user/' + id, options)
        .map(response => response)
        .catch((error: any) => Observable.throw(error));
    }

    insert(user: User): Observable<EntityResponse<User>> {
        const options = new RequestOptions({ headers: this.getJsonAuthHeader() });
        return this.post(this.getBaseUrl() + `api/user/`, user, options)
        .map(response => response)
        .catch((error: any) => Observable.throw(error));
        // return new Observable<User>();
    }

    update(user: User): Observable<EntityResponse<User>> {
        const options = new RequestOptions({ headers: this.getJsonAuthHeader() });
        return this.put(this.getBaseUrl() + `api/user/` + user.id, user, options)
        .map(response => response)
        .catch(error => Observable.throw(error));

        // return new Observable<User>();
    }

    remove(id: number): Observable<EntityResponse<User>> {
      const options = new RequestOptions({ headers: this.getJsonAuthHeader() });
      return this.delete(this.getBaseUrl() + `api/user/` + id, options)
      .map(response => response)
      .catch(error => Observable.throw(error));
    }


}
