import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from '../user/components/login/login.component';
import { LogoutComponent } from '../user/components/logout/logout.component';
import { RegistrationComponent } from '../user/components/registration/registration.component';
import { RegistrationMessageComponent } from '../user/components/registration-message/registration-message.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    RegistrationMessageComponent,
    FooterComponent,
    HeaderComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SpinnerComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    RegistrationMessageComponent,
  ]
})
export class SharedModule { }
