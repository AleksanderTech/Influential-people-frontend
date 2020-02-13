import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../../../core/services/authentication.service";
import { UserLogin } from "../../../shared/model/user-login";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Modal, ModalType } from 'src/app/shared/model/modal';
import { Messages } from 'src/app/shared/constants/messages';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  modal: Modal;
  user: UserLogin;
  invalidSubmit: boolean;
  logInForm: FormGroup;
  accountCreated: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginservice: AuthenticationService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.init();
    this.user = new UserLogin();
    this.logInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  init() {
    this.activatedRoute.queryParams.subscribe(params => {
      if(params){
        this.accountCreated = params['activated'];
      }
    });
    if (this.accountCreated) {
      this.modal = new Modal(ModalType.INFO, Messages.ACTIVATION_ACCOUNT_MESSAGE, true, null);
    }
  }

  get controls() {
    return this.logInForm.controls;
  }

  onModalSubmitting(modal: Modal) {
    this.modal = modal;
  }

  logIn(form: FormGroup) {
    if (this.logInForm.invalid) {
      this.invalidSubmit = true;
      return;
    }
    this.updateUserFields(form);
    this.loginservice.authenticate(this.user).subscribe(
      data => {
        this.router.navigate(["home"]);
      },
      error => {
        if (error['error'].message) {
          if (error['error'].message === Messages.NOT_FOUND_USER_MESSAGE) {
            this.modal = new Modal(ModalType.INFO, Messages.NOT_FOUND_USER_MESSAGE, true);
          } else if (error['error'].message === Messages.INCORRECT_PASSWORD_MESSAGE) {
            this.modal = new Modal(ModalType.INFO, Messages.INCORRECT_PASSWORD_MESSAGE, true);
          } else if (error['error'].message === Messages.USER_DISABLED_MESSAGE) {
            this.modal = new Modal(ModalType.INFO, Messages.USER_DISABLED_MESSAGE + ', check your email to activate your account', true);
          }
        }
      }
    );
  }

  updateUserFields(form: FormGroup) {
    this.user.username = form.controls.username.value;
    this.user.password = form.controls.password.value;
  }
}
