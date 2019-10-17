import { Component, OnInit } from '@angular/core';
import { UserRegistration } from '../../model/user-registration';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Urls } from 'src/app/shared/constants/urls';
import { Router } from '@angular/router';
import { StateService } from 'src/app/shared/service/state.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private user: UserRegistration;

  constructor(private httpClient: HttpClient,private router: Router,private stateService: StateService) { }

  ngOnInit() {

    this.user = new UserRegistration();
  }

  signUp() {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.httpClient.post<any>(Urls.SIGN_UP_REST_URL, JSON.stringify(this.user), { headers: headers, observe: 'response' }).subscribe(response => {
      console.log(response);
      this.stateService.change(response);
      this.router.navigate(['/sign-up/message']);
    }, error => {
      console.log(error);
      this.stateService.change(error);
      this.router.navigate(['/sign-up/message']);
    });
  }
}
