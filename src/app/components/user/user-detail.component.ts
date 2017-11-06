import { RequestOptions } from '@angular/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';

import * as $ from 'jquery';
import { ErrorResponse } from '../../common/error-response';
import { EntityResponse } from '../../common/entity-response';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [UserService],
})
export class UserDetailComponent implements OnInit {
  isNewRecord: boolean;
  // public statusMessage: string;
  // public errorResponse: ErrorResponse;

  @Input() user: User;
  public id: number;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => this.id = +params.get('id'));
    if (this.id) {

      this.userService.getUser(this.id)
        .subscribe(entityResponse => {
          this.user = entityResponse.data;
          if (this.user == null) {
            this.isNewRecord = true;
          } else {
            this.isNewRecord = false;
          }
        });
    } else {
      this.user = new User();
      this.isNewRecord = true;
    }
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.isNewRecord) {
      if (this.user.password !== this.user.confirm_password) {
        this.alertService.error('password and confirm password not same');
        return;
      }
      // add the record
      this.userService.insert(this.user).subscribe((entityResponse: EntityResponse<User>) => {
        this.user = entityResponse.data;
        // this.statusMessage = entityResponse.message;
        this.alertService.success(entityResponse.message);
        // $('.alert-success').fadeIn().show().delay(5000).fadeOut();
        this.isNewRecord = false;
      }, (error: Error) => {
        // errorResponse = new ErrorResponse(error);
        // this.statusMessage = this.errorResponse.message;
        this.alertService.errorResponse(new ErrorResponse(error));
        // $('.alert-danger').fadeIn().show().delay(5000).fadeOut();
      });
    } else {
      // edit the record
      this.userService.update(this.user).subscribe((entityResponse: EntityResponse<User>) => {
        this.user = entityResponse.data;
        // this.statusMessage = entityResponse.message;
        this.alertService.success(entityResponse.message);
        // $('.alert-success').fadeIn().show().delay(5000).fadeOut();
      }, (error: Error) => {
        // this.errorResponse = new ErrorResponse(error);
        // this.statusMessage = this.errorResponse.message;
        this.alertService.errorResponse(new ErrorResponse(error));
        // $('.alert-danger').fadeIn().show().delay(5000).fadeOut();
      });
    }

  }
}
