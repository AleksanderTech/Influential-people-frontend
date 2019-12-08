import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeroesModule } from './heroes/heroes.module';
import { QuoteModule } from './quote/quote.module';
import { ArticleModule } from './article/article.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WelcomeComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HeroesModule,
    QuoteModule,
    ArticleModule,
    CategoryModule,
    CoreModule,
    SharedModule,
    UserModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
