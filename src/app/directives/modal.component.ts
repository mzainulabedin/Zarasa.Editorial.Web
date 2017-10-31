import { Component, HostBinding, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { JQueryStyleEventEmitter } from 'rxjs/observable/FromEventObservable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/zip';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import { ModalService } from '../services/modal.service';
import { Modal } from '../models/modal';

const EVENT_SUFFIX = '#myModal';
const HIDDEN_EVENT_NAME = `hidden.bs.modal.${EVENT_SUFFIX}`;

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
})

export class ModalComponent implements OnInit  {
  public modal: Modal;
  message: string;
  private $modal: JQuery;
  private onHiddenEvent$: Observable<Event>;
  private onConfirmEvent$: Observable<Event>;
  private onHidden$: Observable<Event>;
  private onConfirm$: Observable<Event>;

  constructor(private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.$modal = jQuery('#myModal');

    this.modalService.getModal().subscribe((modal: Modal) => {
      this.modal = modal;
      // console.log(modal);

      this.$modal.find('modal-title').html(this.modal.title);
      this.$modal.find('.modal-body p').html(this.modal.message);

      if (modal.visible) {
        this.$modal.modal('show');
        this.onHiddenEvent$.take(1).subscribe(e => {
          this.modalService.setAction(0);

        });
        this.onConfirmEvent$.take(1).subscribe((e: Event) => {
          const element = $(e.target);
          const type = (element.data('type') === 'yes') ? 1 : 0;
          this.modalService.setAction(type);
        });
      }
    });
    this.onHiddenEvent$ = Observable.fromEvent(this.$modal as JQueryStyleEventEmitter, HIDDEN_EVENT_NAME);
    this.onConfirmEvent$ = Observable.fromEvent(this.$modal.find('button[data-type="yes"]') as JQueryStyleEventEmitter, 'click');

  }
}
