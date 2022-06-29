import { Component, Input } from '@angular/core';
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
    this.quote = this.stocksService.getQuote(symbol);
    this.company = this.stocksService.searchSymbol(symbol).pipe(
      pluck('result'),
      map(
        (companies) =>
          companies.filter((company) => company.symbol === symbol)[0]
      )
    );
  }
  quote: Observable<QuoteData>;
  company: Observable<Company>;

  constructor(private stocksService: StocksService) {}
}
