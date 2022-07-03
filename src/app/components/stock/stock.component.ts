import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, pluck } from 'rxjs';
import { QuoteData } from 'src/app/interfaces/quote.interface';
import { Company } from 'src/app/interfaces/symbol-lookup-response.interface';
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
    this.stocksService.getCompany(symbol).subscribe((company) => {
      if (company) {
        this.company = company;
      } else {
        this.deleteStock.emit(symbol);
      }
    });
  }
  @Output() deleteStock = new EventEmitter<string>();
  symbol: string;
  quote: Observable<QuoteData>;
  company: Company;

  constructor(private stocksService: StocksService, private router: Router) {}

  removeStock(): void {
    this.deleteStock.emit(this.symbol);
  }

  showSentimentsPage(): void {
    this.router.navigate(['sentiment', this.symbol]);
  }
}
