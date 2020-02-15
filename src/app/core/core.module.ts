import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { AuthRedirectorService } from './services/auth-redirector.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [AuthenticationService, AuthRedirectorService, {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
  }]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error();
    }
  }
}
