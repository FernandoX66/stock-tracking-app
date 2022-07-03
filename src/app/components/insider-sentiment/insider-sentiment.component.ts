import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { SentimentResult } from 'src/app/interfaces/sentiment-response.interface';
import { Company } from 'src/app/interfaces/symbol-lookup-response.interface';
import { StocksService } from 'src/app/services/stocks.service';
import { numberToMonth } from 'src/app/utils/number-to-month';

@Component({
  selector: 'app-insider-sentiment',
  templateUrl: './insider-sentiment.component.html',
  styleUrls: ['./insider-sentiment.component.scss'],
})
export class InsiderSentimentComponent implements OnInit {
  company$: Observable<Company | undefined>;
  symbol: string;

  constructor(
    private route: ActivatedRoute,
    private stocksService: StocksService
  ) {
    this.symbol = this.route.snapshot.paramMap.get('symbol') as string;
    const today = new Date();
    this.sentimentResults = this.stocksService
      .getInsiderSentiment(
        this.symbol,
        '2015-01-01',
        new Date(today).toISOString().split('T')[0]
      )
      .pipe(
        pluck('data'),
        map((results) => {
          const slicedResults = results.slice(-3);
          return slicedResults.map((result) => ({
            ...result,
            monthName: numberToMonth(result.month),
          }));
        })
      );
  }
  sentimentResults: Observable<SentimentResult[]>;

  ngOnInit(): void {
    this.company$ = this.stocksService.companies$.pipe(
      map(
        (companies) =>
          companies.filter((company) => company.symbol === this.symbol)[0]
      ),
      switchMap((company) => {
        if (company) {
          return of(company);
        } else {
          return this.stocksService.getCompany(this.symbol);
        }
      })
    );
  }
}
