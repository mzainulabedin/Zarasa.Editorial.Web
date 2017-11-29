import { Component, Input } from '@angular/core';
import { JournalService } from '../../services/journal.service';
import { Journal } from '../../models/journal';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { EntityResponse } from '../../common/entity-response';
import { ErrorResponse } from '../../common/error-response';

@Component({
  selector: 'app-journal-request',
  templateUrl: './journal-request.component.html',
  styleUrls: [ './journal-request.component.css' ],
  providers: [JournalService]
})

export class JournalRequestComponent {
  @Input() journal: Journal;

  constructor(
    private journalService: JournalService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private alertService: AlertService
  ) { this.journal = new Journal(); }


  goBack(): void {
    this.location.back();
  }

  save(): void {
      if (this.journal.admin_email !== this.journal.confirm_email) {
        this.alertService.error('Email and confirm Email not same');
        return;
      }
      // add the record
      this.journalService.requestJournal(this.journal).subscribe((entityResponse: EntityResponse<Journal>) => {
        this.router.navigate(['/journal'], { queryParams: { msg: entityResponse.message }});
      }, (error: Error) => {
        this.alertService.errorResponse(new ErrorResponse(error));
      });
    }

}
