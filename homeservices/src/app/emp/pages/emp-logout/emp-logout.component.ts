import { Component } from '@angular/core';
import { AuthService } from '../../../basic/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-logout',
  standalone: false,
  templateUrl: './emp-logout.component.html',
  styleUrl: './emp-logout.component.scss'
})
export class EmpLogoutComponent {
constructor(private authService: AuthService, private router: Router) {}

  confirmLogout(): void {
    this.authService.logoutEmp();
    window.location.reload();
    // this.router.navigate(['/admin-login']);
    this.router.navigate(['/home']).then(() => {
      window.location.reload();  // Refresh the page after navigation
    });
  }

  cancelLogout(): void {
    this.router.navigate(['/emp-dashboard']);
  }
}
