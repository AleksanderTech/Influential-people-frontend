import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './account/components/login/login.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './account/components/logout/logout.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './account/services/authentication.service';
import { AuthRedirectorService } from './account/services/auth-redirector.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './account/services/auth-interceptor.service';
import { RegistrationComponent } from './account/components/registration/registration.component';
import { RegistrationMessageComponent } from './account/components/registration-message/registration-message.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { WelcomeComponent } from './start/components/welcome.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeroesModule } from './heroes/heroes.module';
import { QuoteModule } from './quote/quote.module';
import { ArticleModule } from './article/article.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    HeaderComponent,
    FooterComponent,
    RegistrationComponent,
    RegistrationMessageComponent,
    SpinnerComponent,
    WelcomeComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HeroesModule,
    QuoteModule,
    ArticleModule
  ],
  providers: [AuthenticationService, AuthRedirectorService, {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
