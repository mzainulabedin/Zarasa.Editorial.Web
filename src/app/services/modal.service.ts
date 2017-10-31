import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ModalComponent } from '../directives/modal.component';
import { Modal } from '../models/modal';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ModalService {
  static readonly YES = 1;
  static readonly NO = 0;
  private modal = new Modal();
  private subject = new Subject<Modal>();
  private action = new Subject<number>();

  confirmationDialog(message) {
    this.modal.title = 'Confirmation';
    this.modal.message = message;
    return this;
  }

  show() {
    this.modal.visible = true;
    this.setModal(this.modal);
    return this;
  }

  setAction(action: number) {
    this.action.next(<number>action);
  }

  getAction(): Observable<any> {
    return this.action.asObservable();
  }

  setModal(modal: Modal) {
    this.subject.next(<Modal>modal);
    return this;
  }

  getModal(): Observable<any> {
    return this.subject.asObservable();
  }

}
