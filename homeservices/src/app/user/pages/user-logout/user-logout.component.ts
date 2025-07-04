import { Component } from '@angular/core';
import { AuthService } from '../../../basic/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-logout',
  standalone: false,
  templateUrl: './user-logout.component.html',
  styleUrl: './user-logout.component.scss'
})
export class UserLogoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  confirmLogout(): void {
    this.authService.logout();
    // this.router.navigate(['/user-login']);
    this.router.navigate(['/home']).then(() => {
      window.location.reload();  // Refresh the page after navigation
    });
  }

  cancelLogout(): void {
    this.router.navigate(['/user-dashboard']);
  }
}
