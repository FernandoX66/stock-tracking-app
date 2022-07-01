import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { StockComponent } from './components/stock/stock.component';
import { HttpClientModule } from '@angular/common/http';
import { InsiderSentimentComponent } from './components/insider-sentiment/insider-sentiment.component';
import { MonthDataComponent } from './components/month-data/month-data.component';
import { NoResultsComponent } from './components/no-results/no-results.component';

@NgModule({
  declarations: [AppComponent, StocksComponent, StockComponent, InsiderSentimentComponent, MonthDataComponent, NoResultsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
