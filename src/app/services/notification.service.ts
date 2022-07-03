import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Notification } from '../interfaces/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private _notification = new Subject<Notification>();

  constructor() {}

  get notification$() {
    return this._notification.asObservable();
  }

  showNotification(title: string, message: string, duration: number = 4000) {
    this._notification.next({ title, message, duration });
  }
}
