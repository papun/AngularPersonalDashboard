import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../shared/notification.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { NotificationData } from '../shared/notification-data.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  animations: [
    trigger('notificationAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(4px)' }),
        animate('0.5s 123ms ease-in'),
      ]),
      transition(':leave', [animate('0.5s ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class NotificationComponent implements OnInit {
  notificaton: NotificationData[];

  timeOut: any;
  text: string[];

  constructor(private nottificationservice: NotificationService) {}

  ngOnInit(): void {
    this.nottificationservice.notifications.subscribe(
      (notification: NotificationData) => {
        this.notificaton = Array(notification)!;
        this.text= Array(notification.text)!;
        clearTimeout(this.timeOut);
        //Clear notification after 1 second
        this.timeOut = setTimeout(() => {
          notification.text = '';
          this.text = null!;
        }, notification.duration);
      }
    );
  }
}
