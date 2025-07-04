import { Component } from '@angular/core';
import { AuthService } from '../../../basic/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-logout',
  standalone: false,
  templateUrl: './admin-logout.component.html',
  styleUrl: './admin-logout.component.scss'
})
export class AdminLogoutComponent {
constructor(private authService: AuthService, private router: Router) {}

  confirmLogout(): void {
    this.authService.logoutAdmin();
    window.location.reload();
    // this.router.navigate(['/admin-login']);
    this.router.navigate(['/home']).then(() => {
      window.location.reload();  // Refresh the page after navigation
    });
  }

  cancelLogout(): void {
    this.router.navigate(['/admin-dashboard']);
  }
}

