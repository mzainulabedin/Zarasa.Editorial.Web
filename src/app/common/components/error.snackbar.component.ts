import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef, MatSnackBarConfig } from '@angular/material';
import { BaseResponse } from '../responses/base-response';
import { ErrorResponse } from '../responses/error-response';

@Component({
  selector: 'app-custom-snack-bar',
  templateUrl: './error.snackbar.component.html',
  styleUrls: ['./error.snackbar.component.scss']
})
export class ErrorSnackBarComponent {
  message: string;
  snackBarRef: MatSnackBarRef<ErrorSnackBarComponent>;
  snackBarConfig: MatSnackBarConfig;
  constructor(snackBarRef: MatSnackBarRef<ErrorSnackBarComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: ErrorResponse) {
    this.snackBarRef = snackBarRef;
    this.snackBarConfig = snackBarRef.containerInstance.snackBarConfig;
    this.message = data.message;
    if (snackBarRef.containerInstance.snackBarConfig.announcementMessage != "") {
      this.message = snackBarRef.containerInstance.snackBarConfig.announcementMessage;
    }
  }

  dismiss() {
    this.snackBarRef.dismiss();
  }
}

