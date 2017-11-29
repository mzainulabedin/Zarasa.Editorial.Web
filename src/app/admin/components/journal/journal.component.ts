import { Component, Inject, Injectable, OnInit, HostBinding, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router} from '@angular/router';
import { Http } from '@angular/http';
import { fadeInAnimation } from '../../../animations/fade-in-animation';
import { ErrorResponse } from '../../../common/error-response';
import { EntityResponse } from '../../../common/entity-response';
import { JournalService } from '../../../services/journal.service';
import { Journal } from '../../../models/journal';
import { ModalService } from '../../../services/modal.service';
import { AlertService } from '../../../services/alert.service';


@Component({
    selector: 'app-admin-journal',
    templateUrl: './journal.component.html',
    styleUrls: [ './journal.component.css' ],
    providers: [JournalService],
    animations: [fadeInAnimation],
})
export class JournalAdminComponent implements OnInit {

    public title = 'Journals';
    public journals: Journal[];
    public selectedId: number;

    public pageNumber: number;
    public pageSize = 3;
    public totalRecords: number;

    public searchText: string;

    @HostBinding('@fadeInAnimation') fadeInAnimation = true;
    @HostBinding('style.display') display = 'block';
    @HostBinding('style.position') position = 'relative';

    constructor(
      private journalService: JournalService,
      private router: Router,
      private modalService: ModalService,
      private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.getPendingJournals(1, this.pageSize);
    }

    gotoDetail(id: number): void {
        this.router.navigate(['/admin/journal-detail', id]);
    }

    getPendingJournals(page: number, size: number, name: string = ''): void {
        this.journalService.getPendingJournals(page, size, name).subscribe(result => {
          this.journals = result.data;
          this.pageNumber = result.pageNumber;
          this.pageSize = result.pageSize;
          this.totalRecords = result.totalRecords;
        });
    }

    public currentPageChanged(event: any): void {
      this.getPendingJournals(event.page, event.itemsPerPage, this.searchText);
    }

    search(): void {
      this.getPendingJournals(this.pageNumber, this.pageSize, this.searchText);
    }

    activate(id: number): void {
      this.modalService.confirmationDialog('Are you sure you want to <b>Activate</b> this <b>Journal</b>?')
      .show()
      .getAction().take(1).subscribe(response => {
        if (response === ModalService.YES) {
          this.activateJournal(id);
        }
      });
    }

    private activateJournal(id: number): void {
      this.journalService.activate(id).subscribe((entityResponse: EntityResponse<Boolean>) => {
        this.alertService.success(entityResponse.message);
        this.search();
      }, (error: Error) => {
        this.alertService.errorResponse(new ErrorResponse(error));
      });
    }
}


