import { Component, Inject, Injectable, OnInit, HostBinding, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { fadeInAnimation } from '../../../animations/fade-in-animation';
import { AdminJournalService } from '../../services/admin.journal.service';
import { AdminJournal } from '../../models/admin.journal';
import { EntityResponse } from '../../../common/responses/entity-response';
import { ErrorResponse } from '../../../common/responses/error-response';
import { MatTableDataSource, Sort, MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmationDialogComponent } from '../../../common/components/confirmation.dialog.component';
import { CustomSnackBarComponent } from '../../../common/components/custom.snackbar.component';
import { ErrorSnackBarComponent } from '../../../common/components/error.snackbar.component';

@Component ({
  selector: 'app-admin-journal',
  templateUrl: './admin.journal.component.html',
  styleUrls: ['./admin.journal.component.scss'],
  providers: [AdminJournalService],
  animations: [fadeInAnimation],
})
export class AdminJournalComponent implements OnInit {
  @HostBinding('@fadeInAnimation') fadeInAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  title = 'Journals';
  journals: AdminJournal[];
  selectedId: number;

  pageNumber: number;
  pageSize = 3;
  totalRecords: number;

  searchText: string;
  orderBy: string;
  orderByDirection: string;


  constructor(
    private journalService: AdminJournalService,
    private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.getPendingJournals(1, this.pageSize);
  }

  gotoDetail(id: number): void {
    this.router.navigate(['/admin/journal-detail', id]);
  }

  getPendingJournals(page: number, size: number, searchString: string = '', orderBy: string = '', orderByDirection: string = ''): void {
    this.journalService.getPendingJournals(page, size, searchString, orderBy, orderByDirection).subscribe(result => {
      this.journals = result.data;
      this.pageNumber = result.pageNumber;
      this.pageSize = result.pageSize;
      this.totalRecords = result.totalRecords;
    });
  }

  public currentPageChanged(event: any): void {
    this.getPendingJournals(event.pageIndex + 1, event.pageSize, this.searchText, this.orderBy, this.orderByDirection);
  }

  search(): void {
    this.getPendingJournals(1, this.pageSize, this.searchText);
  }

  sortData(sort: Sort) {
    if (!sort.active || sort.direction === '') {
      this.getPendingJournals(this.pageNumber, this.pageSize, this.searchText, '', '');
    } else {
      this.getPendingJournals(this.pageNumber, this.pageSize, this.searchText, sort.active, sort.direction);
    }
  }

  activate(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Confirmation', message: 'Are you sure you want to Activate this Journal?' }
    }).afterClosed().subscribe(result => {
      if(result){
        this.journalService.activate(id).subscribe((entityResponse: EntityResponse<Boolean>) => {
          this.snackBar.openFromComponent(CustomSnackBarComponent,
            { duration: 2000, panelClass: 'success-alert', announcementMessage: entityResponse.message });
          this.search();
        }, (error: Error) => {
          this.snackBar.openFromComponent(ErrorSnackBarComponent,
            { duration: 2000, panelClass: 'error-alert', announcementMessage: error.message });
        });
      }
    });
  }
}


