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
import { Journal } from '../models/journal';

import { Router } from '@angular/router';
import { EntityService } from '../../common/services/entity.service';
import { EntityListResponse } from '../../common/responses/entity-list-response';
import { AuthService } from '../../common/services/auth.service';




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

  getJournals(page: number, size: number, searchString: string): Observable<EntityListResponse<Journal>> {
    const options = new RequestOptions({ headers: this.getJsonHeader() });
    return this.getPagedList(this.getBaseUrl() + 'api/journal', page, size, searchString, 'name', 'asc', options)
      .map(response => response)
      .catch((error: any) => Observable.throw(error));
  }

  requestJournal(journal: Journal): Observable<EntityResponse<Journal>> {
    const options = new RequestOptions({ headers: this.getJsonHeader() });
    return this.post(this.getBaseUrl() + `api/journal/request-journal`, journal, options)
      .map(response => response)
      .catch((error: any) => Observable.throw(error));
  }
}
