import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuoteData } from '../interfaces/quote.interface';
import { SymbolLookupResponse } from '../interfaces/symbol-lookup-response.interface';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  private url = 'https://finnhub.io/api/v1';
  private token = 'bu4f8kn48v6uehqi3cqg';

  constructor(private http: HttpClient) {}

  getQuote(symbol: string): Observable<QuoteData> {
    return this.http.get<QuoteData>(
      `${this.url}/quote?symbol=${symbol}&token=${this.token}`
    );
  }

  searchSymbol(symbol: string): Observable<SymbolLookupResponse> {
    return this.http.get<SymbolLookupResponse>(
      `${this.url}/search?q=${symbol}&token=${this.token}`
    );
  }
}
