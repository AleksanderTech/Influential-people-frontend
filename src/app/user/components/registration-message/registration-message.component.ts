import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services/state.service';

@Component({
  selector: 'app-registration-message',
  templateUrl: './registration-message.component.html',
  styleUrls: ['./registration-message.component.css']
})
export class RegistrationMessageComponent implements OnInit {

  static readonly REGISTRATION_MESSAGE_SUCCESS: string = 'Account created successfully, check your email to activate your account';
  static readonly REGISTRATION_MESSAGE_ERROR: string = 'Something went wrong, try again later';
  httpResponse: any;
  message: string;

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.currentHttpResponse.subscribe(httpResponse => this.httpResponse = httpResponse)
    this.message = this.getMessage();
  }

  getMessage(): string {
    if (this.httpResponse.status === 201) {
      return RegistrationMessageComponent.REGISTRATION_MESSAGE_SUCCESS;
    } else {
      return RegistrationMessageComponent.REGISTRATION_MESSAGE_ERROR;
    }
  }
}
