import { Component, Inject, Injectable, OnInit, HostBinding, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { Http } from '@angular/http';
import { fadeInAnimation } from '../../animations/fade-in-animation';
import { ErrorResponse } from '../../common/error-response';
import { EntityResponse } from '../../common/entity-response';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { BsModalComponent } from 'ng2-bs3-modal';

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
    @ViewChild('myModal')
    modal: BsModalComponent;

    @HostBinding('@fadeInAnimation') fadeInAnimation = true;
    @HostBinding('style.display') display = 'block';
    @HostBinding('style.position') position = 'relative';

    constructor(
      private userService: UserService,
      private router: Router,
      private elRef: BsModalComponent) {
    }

    ngOnInit(): void {
        this.getUsers();
    }

    gotoDetail(id: number): void {
        // this.selectedUser = user;
        this.router.navigate(['/user-detail', id]);
    }

    getUsers(): void {
        this.userService.getUsers().subscribe(result => this.users = result.data);
    }

    delete(id: number): void {
      this.modal.open();
      // this.modalService.confirm('i am  modal');
      this.modal.onClose.subscribe(result => {
        this.userService.delete(id).subscribe((entityResponse: EntityResponse<User>) => {
          this.statusMessage = entityResponse.message;
          $('.alert-success').fadeIn().show().delay(5000).fadeOut();
          this.getUsers();
        }, (error: Error) => {
          this.errorResponse = new ErrorResponse(error);
          this.statusMessage = this.errorResponse.message;
          $('.alert-danger').fadeIn().show().delay(5000).fadeOut();
        });
      });
    }


}


