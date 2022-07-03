import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { map, mergeMap, Observable, of } from 'rxjs';
import { QuoteData } from 'src/app/interfaces/quote.interface';
import { Company } from 'src/app/interfaces/symbol-lookup-response.interface';
import { NotificationService } from 'src/app/services/notification.service';
import { StocksService } from 'src/app/services/stocks.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss'],
})
export class StockComponent {
  @Input() set stock(symbol: string) {
    this.symbol = symbol;
    this.quote = this.stocksService.getQuote(symbol);
    this.stocksService.companies$
      .pipe(
        map(
          (companies) =>
            companies.filter((company) => company.symbol === symbol)[0]
        ),
        mergeMap((company) => {
          if (company) {
            return of(company);
          } else {
            return this.stocksService.getCompany(symbol);
          }
        })
      )
      .subscribe((company) => {
        if (company) {
          this.company = company;
        } else {
          this.notificationService.showNotification(
            'Not found',
            'No stock matching that symbol.'
          );
          this.deleteStock.emit(symbol);
        }
      });
  }
  @Output() deleteStock = new EventEmitter<string>();
  symbol: string;
  quote: Observable<QuoteData>;
  company: Company;

  constructor(
    private stocksService: StocksService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  removeStock(): void {
    this.deleteStock.emit(this.symbol);
  }

  showSentimentsPage(): void {
    this.router.navigate(['sentiment', this.symbol]);
  }
}
