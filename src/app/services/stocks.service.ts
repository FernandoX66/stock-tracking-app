import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { QuoteData } from '../interfaces/quote.interface';
import { SentimentResponse } from '../interfaces/sentiment-response.interface';
import {
  Company,
  SymbolLookupResponse,
} from '../interfaces/symbol-lookup-response.interface';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  private _url = 'https://finnhub.io/api/v1';
  private _token = 'bu4f8kn48v6uehqi3cqg';
  private _companies = new BehaviorSubject<Company[]>([]);

  constructor(private http: HttpClient) {}

  get companies$(): Observable<Company[]> {
    return this._companies.asObservable();
  }

  getQuote(symbol: string): Observable<QuoteData> {
    return this.http.get<QuoteData>(
      `${this._url}/quote?symbol=${symbol}&token=${this._token}`
    );
  }

  getCompany(symbol: string): Observable<Company> {
    return this.http
      .get<SymbolLookupResponse>(
        `${this._url}/search?q=${symbol}&token=${this._token}`
      )
      .pipe(
        pluck('result'),
        map(
          (companies) =>
            companies.filter((company) => company.symbol === symbol)[0]
        ),
        tap((company) =>
          this._companies.next([...this._companies.value, company])
        )
      );
  }

  getInsiderSentiment(
    symbol: string,
    from: string,
    to: string
  ): Observable<SentimentResponse> {
    return this.http.get<SentimentResponse>(
      `${this._url}/stock/insider-sentiment?symbol=${symbol}&from=${from}&to=${to}&token=${this._token}`
    );
  }
}
