import { Injectable, Inject } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Headers } from '@angular/http';
// Import RxJs required methods
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { EntityService } from '../../common/services/entity.service';
import { AdminJournal } from '../models/admin.journal';
import { Router } from '@angular/router';
import { AuthService } from '../../common/services/auth.service';
import { EntityListResponse } from '../../common/responses/entity-list-response';
import { EntityResponse } from '../../common/responses/entity-response';



@Injectable()
export class AdminJournalService extends EntityService<AdminJournal> {

  constructor(protected http: Http, protected router: Router, protected authService: AuthService) {
    super(http, router, authService);
  }

  getPendingJournals(page: number, size: number, searchString: string, orderBy: string,
    orderByDirection: string): Observable<EntityListResponse<AdminJournal>> {
    const options = new RequestOptions({ headers: this.getJsonAuthHeader() });
    return this.getPagedList(this.getBaseUrl() + 'api/journal/get-pending', page, size, searchString,
      orderBy, orderByDirection, options)
      .map(response => response)
      .catch((error: Error) => Observable.throw(error.message));
  }

  activate(id: number): Observable<EntityResponse<Boolean>> {
    const options = new RequestOptions({ headers: this.getJsonAuthHeader() });
    return this.put(this.getBaseUrl() + `api/journal/activate/` + id, null, options)
      .map(response => response)
      .catch(error => Observable.throw(error));
  }
}
