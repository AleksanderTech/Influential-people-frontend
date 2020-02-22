import { Component, OnInit } from "@angular/core";
import { UserRegistration } from "../../../shared/model/user-registration";
import { Router } from "@angular/router";
import { StateService } from "src/app/core/services/state.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchTwoValues } from 'src/app/shared/util/matcher';
import { RegistrationService } from '../../service/registration.service';
import { Messages } from 'src/app/shared/constants/messages';
import { AlertMediator } from 'src/app/shared/model/alert-mediator';


@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {

  alertMediator: AlertMediator;
  loadingData: boolean;
  user: UserRegistration;
  invalidSubmit: boolean;
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService,
    private router: Router,
    private stateService: StateService
  ) { }

  get controls() { return this.registerForm.controls; }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern("(.)+[@][^@]+[.][a-zA-Z0-9]+")]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: matchTwoValues('password', 'confirmPassword')
    });
    this.user = new UserRegistration();
  }

  signUp(form: FormGroup) {
    if (this.registerForm.invalid) {
      this.invalidSubmit = true;
      return;
    }
    this.updateUserFields(form);
    this.loadingData = true;
    this.registrationService.register(this.user)
      .subscribe(
        response => {
          this.loadingData = false;
          this.stateService.change(response);
          this.alertMediator = new AlertMediator(Messages.REGISTRATION_MESSAGE_SUCCESS,true);
        },
        error => {
          this.loadingData = false;
          this.stateService.change(error);
          this.alertMediator = new AlertMediator(Messages.REGISTRATION_MESSAGE_ERROR,true);
        }
      );
  } 
  
  onEnter(form: FormGroup,event:any){
    if(event.keyCode===13){
      this.signUp(form);
    }
  }

  onModalSubmitting(modal:AlertMediator){
    this.alertMediator = modal;
  }

  updateUserFields(form: FormGroup) {
    this.user.email = form.controls.email.value;
    this.user.username = form.controls.username.value;
    this.user.password = form.controls.password.value;
  }
}
