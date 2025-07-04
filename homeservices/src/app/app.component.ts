import { Component } from '@angular/core';
import { UserStorageService } from './basic/services/storage/user-storage.service';
import { AdminStorageService } from './basic/services/storage/admin-storage.service';
import { EmpStorageService } from './basic/services/storage/emp-storage.service';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'homeservices';
  isEmpLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;
  isUserLoggedIn: boolean = false;

  constructor(private userStorageService: UserStorageService, private adminStorageService: AdminStorageService, private empStorageService: EmpStorageService, private router: Router, private viewportScroller: ViewportScroller) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.viewportScroller.scrollToPosition([0, 0]); // Scroll to top
    });
  }
  ngOnInit() {
    this.isEmpLoggedIn = this.empStorageService.isEmpLoggedIn();
    this.isAdminLoggedIn = this.adminStorageService.isAdminLoggedIn();
    this.isUserLoggedIn = this.userStorageService.isUserLoggedIn();
  }

  logout() {
    this.empStorageService.clearEmp();
    this.adminStorageService.clearAdmin();
    this.userStorageService.clearUser();

    // Update UI
    this.isEmpLoggedIn = false;
    this.isAdminLoggedIn = false;
    this.isUserLoggedIn = false;
  }
}
