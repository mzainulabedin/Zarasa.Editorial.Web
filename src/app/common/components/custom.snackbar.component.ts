import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef, MatSnackBarConfig } from '@angular/material';
import { BaseResponse } from '../responses/base-response';

@Component ({
  selector: 'app-custom-snack-bar',
  templateUrl: './custom.snackbar.component.html',
  styleUrls: ['./custom.snackbar.component.scss']
})
export class CustomSnackBarComponent {
  message: string;
  snackBarRef: MatSnackBarRef<CustomSnackBarComponent>;
  snackBarConfig: MatSnackBarConfig;
  constructor(snackBarRef: MatSnackBarRef<CustomSnackBarComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: BaseResponse) {
    this.snackBarRef = snackBarRef;
    this.snackBarConfig = snackBarRef.containerInstance.snackBarConfig;
    this.message = snackBarRef.containerInstance.snackBarConfig.announcementMessage;
  }

  dismiss() {
    this.snackBarRef.dismiss();
  }
}

