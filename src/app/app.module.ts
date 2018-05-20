import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule}from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import {StockComponent}from './stocks/stock.component';
import {StockService}from './stocks/stock.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    StockComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
        { path: 'welcome', component: WelcomeComponent },
        { path: 'stocks', component: StockComponent },
        { path: '', redirectTo: 'welcome', pathMatch: 'full'},
        { path: '**', redirectTo: 'welcome', pathMatch: 'full'}
    ])
  ],
   providers: [
    StockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
