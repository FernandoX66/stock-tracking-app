import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private localStorage = localStorage;

  constructor() {}

  getStocks(): string[] {
    return JSON.parse(this.localStorage.getItem('stocks')!);
  }

  setStocks(body: string[]): void {
    this.localStorage.setItem('stocks', JSON.stringify(body));
  }
}
