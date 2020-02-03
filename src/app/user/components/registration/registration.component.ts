import { Component, OnInit } from "@angular/core";
import { UserRegistration } from "../../../shared/model/user-registration";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Urls } from "src/app/shared/constants/urls";
import { Router } from "@angular/router";
import { StateService } from "src/app/core/services/state.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchTwoValues } from 'src/app/shared/util/matcher';


@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {

  loadingData: boolean;
  user: UserRegistration;
  invalidSubmit: boolean;
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private stateService: StateService
  ) { }

  ngOnInit() {

    this.user = new UserRegistration();
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern("(.)+[@][^@]+[.][a-zA-Z0-9]+")]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: matchTwoValues('password', 'confirmPassword')
    });
  }

  get controls() { return this.registerForm.controls; }

  signUp(form: FormGroup) {

    if (this.registerForm.invalid) {
      this.invalidSubmit = true;
      return;
    }
    this.updateUserFields(form);
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    this.loadingData = true;
    this.httpClient
      .post<any>(Urls.ROOT_REST_URL + Urls.SIGN_UP, JSON.stringify(this.user), {
        headers: headers,
        observe: "response"
      })
      .subscribe(
        response => {
          console.log(response);
          this.loadingData = false;
          this.stateService.change(response);
          this.router.navigate(["/sign-up/message"]);
        },
        error => {
          console.log(error);
          this.loadingData = false;
          this.stateService.change(error);
          this.router.navigate(["/sign-up/message"]);
        }
      );
  }

  private updateUserFields(form: FormGroup) {
    this.user.email = form.controls.email.value;
    this.user.username = form.controls.username.value;
    this.user.password = form.controls.password.value;
  }
}
