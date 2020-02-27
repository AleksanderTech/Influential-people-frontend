import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../../core/services/authentication.service";
import { UserLogin } from "../../../shared/model/user-login";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Messages } from 'src/app/shared/constants/messages';
import { AlertMediator } from 'src/app/shared/model/alert-mediator';
import { UserService } from '../../service/user.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CurrentUserService } from 'src/app/core/services/current-user.service';
import { SecurityConstants } from 'src/app/shared/constants/security-constants';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  alertMediator: AlertMediator;
  user: UserLogin;
  invalidSubmit: boolean;
  logInForm: FormGroup;
  accountCreated: boolean;

  constructor(
    private authentication: AuthenticationService,
    private currentUser:CurrentUserService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params) {
        this.accountCreated = params['activated'];
      }
    });
    if (this.accountCreated) {
      this.alertMediator = new AlertMediator(Messages.ACTIVATION_ACCOUNT_MESSAGE, true, null); // todo usunac zmienna
    }
    this.user = new UserLogin();
    this.logInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get controls() {
    return this.logInForm.controls;
  }

  onSubmit(alertMediator: AlertMediator) {
    this.alertMediator = alertMediator;
  }

  onEnter(form: FormGroup, event: any) {
    if (event.keyCode === 13) {
      this.logIn(form);
    }
  }

  updateUserFields(form: FormGroup) {
    this.user.username = form.controls.username.value;
    this.user.password = form.controls.password.value;
  }

  logIn(form: FormGroup, ) {
    if (this.logInForm.invalid) {
      this.invalidSubmit = true;
      return;
    }
    this.updateUserFields(form);
    this.authentication.authenticate(this.user).subscribe(
      response => {
        this.currentUser.saveToken(response['jwt']);
        this.userService.getUser(this.user.username, new HttpHeaders({
            'Authorization': SecurityConstants.TOKEN_PREFIX+response['jwt']
          })).subscribe(
          response => {
            this.currentUser.saveCurrentUser(response);
            this.router.navigate(['/home']);
          }, error => {
            this.alertMediator = new AlertMediator(Messages.NOT_FOUND_USER_MESSAGE, true);
          })
      },
      error => {
        if (error['error'].message) {
          if (error['error'].message === Messages.NOT_FOUND_USER_MESSAGE) {
            this.alertMediator = new AlertMediator(Messages.NOT_FOUND_USER_MESSAGE, true);
          } else if (error['error'].message === Messages.INCORRECT_PASSWORD_MESSAGE) {
            this.alertMediator = new AlertMediator(Messages.INCORRECT_PASSWORD_MESSAGE, true);
          } else if (error['error'].message === Messages.USER_DISABLED_MESSAGE) {
            this.alertMediator = new AlertMediator(Messages.USER_DISABLED_CHECK_EMAIL_MESSAGE, true);
          }
        }
      }
    );
  }
}
