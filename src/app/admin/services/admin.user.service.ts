import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Headers } from '@angular/http';
// Import RxJs required methods
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { EntityResponse } from '../../common/responses/entity-response';
import { AdminUser } from '../models/admin.user';

import { Router } from '@angular/router';
import { EntityService } from '../../common/services/entity.service';
import { AuthService } from '../../common/services/auth.service';
import { EntityListResponse } from '../../common/responses/entity-list-response';




@Injectable()
export class AdminUserService extends EntityService<AdminUser> {

  constructor(protected http: Http, protected router: Router, protected authService: AuthService) {
    super(http, router, authService);
  }


  getUsers(page: number, size: number, searchString: string, orderBy: string,
    orderByDirection: string): Observable<EntityListResponse<AdminUser>> {
    const options = new RequestOptions({ headers: this.getJsonAuthHeader() });

    return this.getPagedList(this.getBaseUrl() + 'api/user', page, size, searchString,
      orderBy, orderByDirection, options)
      .map(response => response)
      .catch((error: Error) => Observable.throw(error.message));
  }

  getUser(id: number): Observable<EntityResponse<AdminUser>> {
    const options = new RequestOptions({ headers: this.getJsonAuthHeader() });
    return this.get(this.getBaseUrl() + 'api/user/' + id, options)
      .map(response => response)
      .catch((error: any) => Observable.throw(error));
  }

  insert(user: AdminUser): Observable<EntityResponse<AdminUser>> {
    const options = new RequestOptions({ headers: this.getJsonAuthHeader() });
    return this.post(this.getBaseUrl() + `api/user/`, user, options)
      .map(response => response)
      .catch((error: any) => Observable.throw(error));
    // return new Observable<User>();
  }

  update(user: AdminUser): Observable<EntityResponse<AdminUser>> {
    const options = new RequestOptions({ headers: this.getJsonAuthHeader() });
    return this.put(this.getBaseUrl() + `api/user/` + user.id, user, options)
      .map(response => response)
      .catch(error => Observable.throw(error));

    // return new Observable<User>();
  }

  remove(id: number): Observable<EntityResponse<AdminUser>> {
    const options = new RequestOptions({ headers: this.getJsonAuthHeader() });
    return this.delete(this.getBaseUrl() + `api/user/` + id, options)
      .map(response => response)
      .catch(error => Observable.throw(error));
  }


}
