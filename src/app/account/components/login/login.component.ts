import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../../services/authentication.service";
import { UserLogin } from "../../model/user-login";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private user: UserLogin;
  private isLoginValid: boolean;
  private invalidSubmit: boolean;

  constructor(
    private router: Router,
    private loginservice: AuthenticationService
  ) { }

  ngOnInit() {
    this.isLoginValid = false;
    this.invalidSubmit = false;
    this.user = new UserLogin();
  }

  validateForm(form: any): boolean {

    return !form.invalid;
  }

  logIn(form: any) {
    if (this.validateForm(form)) {
      this.loginservice.authenticate(this.user).subscribe(
        data => {
          this.router.navigate([""]);
          this.isLoginValid = true;
        },
        error => {
          this.isLoginValid = false;
        }
      );
    } else {
      this.invalidSubmit = true;
    }
  }
}
