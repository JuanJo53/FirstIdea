import { NotificationDetailsComponent } from './../../modules/components/dialogs/notification-details/notification-details.component';
import { Notification } from '../../models/notification.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/user_services/notification.service';
import { UserService } from '../../services/user_services/user.service';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  user: User;
  intervalId: number;
  notifications: Notification[] = [];

  notificationCount: number = 0;
  showNotification: boolean;
  logo: string = 'assets/images/logo.JPG';

  constructor(
    private notificationService: NotificationService,
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.intervalId = setInterval(() => this.fecthNotifications(), 1000000);
    this.fecthNotifications();
    this.getimage();
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
  viewNotification(id: number): void {
    this.notificationService
      .markSeenNotification(1, id)
      .subscribe((notification) => {
        console.log(notification);
      });
  }
  getNotificationDetails(id: number): void {
    console.log('Notify id clicked: ' + id.toString());
    this.openDialog(id);
  }
  openDialog(id: number): void {
    const dialogRef = this.dialog.open(NotificationDetailsComponent, {
      width: '500px',
      data: {
        notificationId: id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }
  fecthNotifications(): void {
    this.notificationCount = 0;
    this.notificationService
      .getUserNotifications(1)
      .subscribe((notifications) => {
        this.notifications = notifications;
        this.notifications.forEach((notif) => {
          if (notif.status === 2) {
            this.notificationCount++;
          }
        });
      });
  }
  getimage() {
    this.userService.getUserDeatails().subscribe((data) => {
      this.user = data;
    });
  }
}
