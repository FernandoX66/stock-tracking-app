import { Component, OnInit } from '@angular/core';
import { Notification } from './interfaces/notification.interface';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'stock-tracking-app';
  showNotification = false;
  notification: Notification;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notification$.subscribe((notification) => {
      this.notification = notification;
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, this.notification.duration);
    });
  }
}
