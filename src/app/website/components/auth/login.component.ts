import { Component, Input, HostBinding } from '@angular/core';
import { AuthService } from '../../../common/services/auth.service';
import { LoginCredential } from '../../models/login.credential';
// import { AlertService } from '../../../services/alert.service';
import { ErrorResponse } from '../../../common/responses/error-response';
import { EntityResponse } from '../../../common/responses/entity-response';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../../animations/fade-in-animation';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ],
  animations: [fadeInAnimation]
})

export class LoginComponent {
  @HostBinding('@fadeInAnimation') fadeInAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  @Input() loginCredential: LoginCredential;

  constructor(
    private authService: AuthService,
    // private alertService: AlertService,
    private router: Router,
    public snackBar: MatSnackBar
  ) {
    this.loginCredential = new LoginCredential();
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }

  signIn(): void {
    this.authService.login(this.loginCredential.email, this.loginCredential.password)
    .subscribe((response: EntityResponse<any>) => {
      this.router.navigate(['/admin']);
    }, (error: Error) => {
      const errorResponse = new ErrorResponse(error);
      this.snackBar.open(errorResponse.message, 'Error', {
        duration: 2000,
      });
    });
  }
}

