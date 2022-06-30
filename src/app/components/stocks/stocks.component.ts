import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss'],
})
export class StocksComponent implements OnInit {
  stockInput = new FormControl('', [Validators.pattern('^[A-Z]{1,5}$')]);
  stocks: string[] = [];

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    if (this.localStorageService.getItem('stocks')) {
      this.stocks = this.localStorageService.getItem('stocks');
    }
  }

  trackStock(): void {
    this.stocks.push(this.stockInput.value);
    this.localStorageService.setItem('stocks', this.stocks);
    this.stockInput.reset();
  }

  onDeleteStock(symbol: string): void {
    const index = this.stocks.indexOf(symbol);
    this.stocks.splice(index, 1);
    this.localStorageService.setItem('stocks', this.stocks);
  }
}
