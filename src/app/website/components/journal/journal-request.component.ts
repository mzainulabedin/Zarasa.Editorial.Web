import { Component, Input, HostBinding } from '@angular/core';
import { JournalService } from '../../services/journal.service';
import { Journal } from '../../models/journal';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityResponse } from '../../../common/responses/entity-response';
import { CustomSnackBarComponent } from '../../../common/components/custom.snackbar.component';
import { MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { ParseError } from '@angular/compiler';
import { fadeInAnimation } from '../../../animations/fade-in-animation';


@Component({
  selector: 'app-journal-request',
  templateUrl: './journal-request.component.html',
  styleUrls: ['./journal-request.component.scss'],
  providers: [JournalService],
  animations: [fadeInAnimation],
})

export class JournalRequestComponent {
  @HostBinding('@fadeInAnimation') fadeInAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  @Input() journal: Journal;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private journalService: JournalService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private snackBar: MatSnackBar
  ) { this.journal = new Journal(); }


  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.journal.admin_email !== this.journal.confirm_email) {
      // this.alertService.error('Email and confirm Email not same');
      this.snackBar.openFromComponent(CustomSnackBarComponent
        , { duration: 2000, panelClass: 'error-alert', announcementMessage: 'Email and confirm Email not same' });
      return;
    }
    // add the record
    this.journalService.requestJournal(this.journal).subscribe((entityResponse: EntityResponse<Journal>) => {
      this.snackBar.openFromComponent(CustomSnackBarComponent
        , { duration: 2000, panelClass: 'success-alert', announcementMessage: entityResponse.message })
        .afterDismissed().subscribe(() => {
          this.router.navigate(['/journal']);
        });
      // this.router.navigate(['/journal'], { queryParams: { msg: entityResponse.message }});
    }, (error: Error) => {
      this.snackBar.openFromComponent(CustomSnackBarComponent
        , { duration: 2000, panelClass: 'error-alert', announcementMessage: error.message });
    });
  }

  getValidationMessage(formCtrl: FormControl, validations: string[], messages: string[]) {
    let retMsg = '';
    if (validations.length !== messages.length) {
      throw new TypeError("Validation and Messages not matched");
    }
    for (let i = 0; i < validations.length; i++) {
      const element = validations[i];
      if (formCtrl.hasError(element)) {
        retMsg = messages[i];
        break;
      }
    }
    return retMsg;
  }
}
