import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NgZorroModule } from './NgZorroModule';
import { StorageService } from './auth/services/storage/storage.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, RouterOutlet, NgZorroModule, NzButtonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rentacar-angular';

  isAdminLoggedIn: boolean = false;
  isCustomerLoggedIn: boolean = false;

  constructor(private router: Router, private storageService: StorageService) {}

  ngOnInit() {
    this.updateLoginStatus();

    this.router.events.subscribe((event) => {
      if (event.constructor.name === 'NavigationEnd') {
        this.updateLoginStatus();
      }
    });
  }

  updateLoginStatus() {
    this.isAdminLoggedIn = this.storageService.isAdminLoggedIn();
    this.isCustomerLoggedIn = this.storageService.isCustomerLoggedIn();
  }

  logout() {
    this.storageService.logout();
    this.router.navigateByUrl('/login');
  }
}
