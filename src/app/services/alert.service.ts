import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
// import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { Alert, AlertType } from '../models/alert';
import { Observable } from 'rxjs/Observable';
import { ErrorResponse } from '../common/error-response';

@Injectable()
export class AlertService {
    private subject = new Subject<Alert>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert messages
                    this.clear();
                }
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Success, message, keepAfterRouteChange);
    }

    error(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Error, message, keepAfterRouteChange);
    }

    errorResponse(errorResponse: ErrorResponse, keepAfterRouteChange = false) {
      this.errorAlert(errorResponse, keepAfterRouteChange);
    }

    info(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Info, message, keepAfterRouteChange);
    }

    warn(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Warning, message, keepAfterRouteChange);
    }

    alert(type: AlertType, message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        const alert = <Alert>{ type: type, message: message, visible: true };
        this.subject.next(alert);
        setTimeout(() => {
          alert.visible = false;
          this.subject.next(alert);
        }, 6000);
    }

    errorAlert(errorResponse: ErrorResponse, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        const alert = <Alert>{ type: AlertType.Error, message: errorResponse.message, visible: true,
          errors: errorResponse.errors };
        this.subject.next(alert);
        setTimeout(() => {
          alert.visible = false;
          this.subject.next(alert);
        }, 60000);
    }

    clear() {
        // clear alerts
        this.subject.next();
    }
}
