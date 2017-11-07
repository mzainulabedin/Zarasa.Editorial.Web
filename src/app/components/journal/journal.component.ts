import { Component, Inject, Injectable, OnInit, HostBinding, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router} from '@angular/router';
import { Http } from '@angular/http';
import { fadeInAnimation } from '../../animations/fade-in-animation';
import { ErrorResponse } from '../../common/error-response';
import { EntityResponse } from '../../common/entity-response';
import { JournalService } from '../../services/journal.service';
import { Journal } from '../../models/journal';
import { ModalService } from '../../services/modal.service';


@Component({
    selector: 'app-user',
    templateUrl: './journal.component.html',
    styleUrls: [ './journal.component.css' ],
    providers: [JournalService],
    animations: [fadeInAnimation],
})
export class JournalComponent implements OnInit {

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
      private userService: JournalService,
      private router: Router,
      private modalService: ModalService) {
    }

    ngOnInit(): void {
        this.getJournals(1, this.pageSize);
    }

    gotoDetail(id: number): void {
        this.router.navigate(['/admin/journal-detail', id]);
    }

    getJournals(page: number, size: number, name: string = ''): void {
        this.userService.getJournals(page, size, name).subscribe(result => {
          this.journals = result.data;
          this.pageNumber = result.pageNumber;
          this.pageSize = result.pageSize;
          this.totalRecords = result.totalRecords;
        });
    }

    public currentPageChanged(event: any): void {
      // this.currentSelectedPage = ' is : ' + event.page;
      // this.currentItemsPerPage = ' is : ' +  event.itemsPerPage;
      this.getJournals(event.page, event.itemsPerPage, this.searchText);
    }

    search(): void {
      this.getJournals(this.pageNumber, this.pageSize, this.searchText);
    }
}


