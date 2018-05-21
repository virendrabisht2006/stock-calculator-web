import { BrowserModule } from '@angular/platform-browser';
import {FormsModule }from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpClientModule}from '@angular/common/http';
import {HttpHeaders}from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import {StockComponent}from './stocks/stock.component';
import {StockService}from './stocks/stock.service';
import {TradeComponent}from './trades/trade.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    StockComponent,
    TradeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
        { path: 'welcome', component: WelcomeComponent },
        { path: 'stocks', component: StockComponent },
         { path: 'trades', component: TradeComponent },
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
