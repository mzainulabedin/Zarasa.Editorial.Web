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
import { Journal } from '../models/journal';

import { Router } from '@angular/router';
import { EntityService } from '../services/entity.service';
// import { AuthService } from '../services/auth.service';
import { EntityListResponse } from '../common/entity-list-response';
import { AuthService } from './auth.service';




@Injectable()
export class JournalService extends EntityService<Journal> {

  constructor(protected http: Http, protected router: Router, protected authService: AuthService) {
    super(http, router, authService);
  }


  getJournalCodes(): Observable<EntityListResponse<Journal>> {
    const options = new RequestOptions({ headers: this.getJsonHeader() });
      return this.getList(this.getBaseUrl() + 'api/journal', options)
      .map(response => response)
      .catch((error: any) => Observable.throw(error));
  }

    getJournals(page: number, size: number, name: string): Observable<EntityListResponse<Journal>> {
      const options = new RequestOptions({ headers: this.getJsonHeader() });
        return this.getList(this.getBaseUrl() + 'api/journal?page=' + page + '&size=' + size + '&name=' + name, options)
        .map(response => response)
        .catch((error: any) => Observable.throw(error));
    }

    getPendingJournals(page: number, size: number, name: string): Observable<EntityListResponse<Journal>> {
      const options = new RequestOptions({ headers: this.getJsonAuthHeader() });
        return this.getList(this.getBaseUrl() + 'api/journal/get-pending?page=' + page + '&size=' + size + '&name=' + name, options)
        .map(response => response)
        .catch((error: any) => Observable.throw(error));
    }

    // getUser(id: number): Observable<EntityResponse<Journal>> {
    //     const options = new RequestOptions({ headers: this.getJsonHeader() });
    //     return this.get(this.getBaseUrl() + 'api/journal/' + id, options)
    //     .map(response => response)
    //     .catch((error: any) => Observable.throw(error));
    // }

    requestJournal(journal: Journal): Observable<EntityResponse<Journal>> {
        const options = new RequestOptions({ headers: this.getJsonHeader() });
        return this.post(this.getBaseUrl() + `api/journal/request-journal`, journal, options)
        .map(response => response)
        .catch((error: any) => Observable.throw(error));
    }

    activate(id: number): Observable<EntityResponse<Boolean>> {
      const options = new RequestOptions({ headers: this.getJsonAuthHeader() });
      return this.put(this.getBaseUrl() + `api/journal/activate/` + id, null, options)
      .map(response => response)
      .catch(error => Observable.throw(error));
     }
}
