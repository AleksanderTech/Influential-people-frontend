import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../core/services/authentication.service";
import { UserLogin } from "../../../shared/model/user-login";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  private user: UserLogin;
  private invalidSubmit: boolean;
  private logInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginservice: AuthenticationService
  ) { }

  ngOnInit() {

    this.user = new UserLogin();
    this.logInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get controls() {
    return this.logInForm.controls;
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

      }
    );
  }

  private updateUserFields(form: FormGroup) {
    this.user.username = form.controls.username.value;
    this.user.password = form.controls.password.value;
  }
}
