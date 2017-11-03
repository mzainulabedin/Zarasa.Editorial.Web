import { Component, Input, HostBinding } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginCredential } from '../../models/login.credential';
import { AlertService } from '../../services/alert.service';
import { ErrorResponse } from '../../common/error-response';
import { EntityResponse } from '../../common/entity-response';
import { Router } from '@angular/router';
import { fadeInAnimation } from '../../animations/fade-in-animation';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ],
  animations: [fadeInAnimation]
})

export class LoginComponent {
  @HostBinding('@fadeInAnimation') fadeInAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'relative';

  @Input() loginCredential: LoginCredential;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.loginCredential = new LoginCredential();
  }
  signIn(): void {
    this.authService.login(this.loginCredential.email, this.loginCredential.password)
    .subscribe((response: EntityResponse<any>) => {
      this.router.navigate(['/admin']);
    }, (error: Error) => this.alertService.errorResponse(new ErrorResponse(error)));
  }
}

