import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/auth/components/login/login.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from './core/auth/components/logout/logout.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './core/auth/services/authentication.service';
import { AuthRedirectorService } from './core/auth/services/auth-redirector.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './core/auth/services/auth-interceptor.service';
import { RegistrationComponent } from './core/auth/components/registration/registration.component';
import { RegistrationMessageComponent } from './core/auth/components/registration-message/registration-message.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { WelcomeComponent } from './welcome/welcome.component';
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
