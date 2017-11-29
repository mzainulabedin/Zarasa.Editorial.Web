import { Component, Inject, Injectable, OnInit, HostBinding, ViewChild, Output, EventEmitter } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Http } from '@angular/http';
import { fadeInAnimation } from '../../animations/fade-in-animation';
import { ErrorResponse } from '../../common/error-response';
import { EntityResponse } from '../../common/entity-response';
import { JournalService } from '../../services/journal.service';
import { Journal } from '../../models/journal';
import { ModalService } from '../../services/modal.service';
import { AlertService } from '../../services/alert.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
    selector: 'app-user',
    templateUrl: './journal.component.html',
    styleUrls: [ './journal.component.css' ],
    providers: [JournalService],
    animations: [fadeInAnimation],
})
export class JournalComponent implements OnInit, AfterViewInit {


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
      private route: ActivatedRoute,
      private alertService: AlertService,
      private modalService: ModalService) {
    }

    ngOnInit(): void {
        this.getJournals(1, this.pageSize);

    }

    ngAfterViewInit(): void {
      const msg =  this.route.snapshot.queryParams['msg'] || '';
      if (msg != null) {
        this.alertService.success(msg);
      }
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
      this.getJournals(event.page, event.itemsPerPage, this.searchText);
    }

    search(): void {
      this.getJournals(this.pageNumber, this.pageSize, this.searchText);
    }
}


