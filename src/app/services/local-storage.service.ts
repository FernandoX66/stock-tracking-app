import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private localStorage = localStorage;

  constructor() {}

  getItem(key: string): any {
    return JSON.parse(this.localStorage.getItem(key)!);
  }

  setItem(key: string, body: any): void {
    this.localStorage.setItem(key, JSON.stringify(body));
  }
}
