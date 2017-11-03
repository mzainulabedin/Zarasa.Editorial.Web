import { Component, Inject, Injectable, OnInit, HostBinding, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router} from '@angular/router';
import { Http } from '@angular/http';
import { fadeInAnimation } from '../../animations/fade-in-animation';
import { ErrorResponse } from '../../common/error-response';
import { EntityResponse } from '../../common/entity-response';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: [ './user.component.css' ],
    providers: [UserService],
    animations: [fadeInAnimation],
})
export class UserComponent implements OnInit {

    public title = 'Tour of Heroes';
    public users: User[];
    public statusMessage: string;
    public errorResponse: ErrorResponse;
    public selectedId: number;

    @HostBinding('@fadeInAnimation') fadeInAnimation = true;
    @HostBinding('style.display') display = 'block';
    @HostBinding('style.position') position = 'relative';

    constructor(
      private userService: UserService,
      private router: Router,
      private modalService: ModalService) {
    }

    ngOnInit(): void {
        this.getUsers();
    }

    gotoDetail(id: number): void {
        this.router.navigate(['/admin/user-detail', id]);
    }

    getUsers(): void {
        this.userService.getUsers().subscribe(result => this.users = result.data);
    }

    delete(id: number): void {
      this.modalService.confirmationDialog('Are you sure you want to save this record?')
      .show()
      .getAction().take(1).subscribe(response => {
        if (response === ModalService.YES) {
          this.userService.delete(id).subscribe((entityResponse: EntityResponse<User>) => {
            this.statusMessage = entityResponse.message;
            $('.alert-success').fadeIn().show().delay(5000).fadeOut();
            this.getUsers();
          }, (error: Error) => {
            this.errorResponse = new ErrorResponse(error);
            this.statusMessage = this.errorResponse.message;
            $('.alert-danger').fadeIn().show().delay(5000).fadeOut();
          });
        }
      });
    }
}


