import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { AdminStorageService } from '../../services/storage/admin-storage.service';

@Component({
  selector: 'app-login-admin',
  standalone: true,
    imports : [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.scss'
})
export class LoginAdminComponent {
  validateForm!: FormGroup;
  isAdminLoggedIn: boolean = false;

  
    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private notification: NzNotificationService,
      private router: Router,
      private adminStorageService: AdminStorageService
    ) {}
  
    ngOnInit() {
      this.validateForm = this.fb.group({
        email: [null, [Validators.email, Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
        password: [null, [Validators.required, Validators.minLength(6)]],
      });
      this.isAdminLoggedIn = this.adminStorageService.isAdminLoggedIn();
    }

    submitForm() {
      this.authService.admin_login(
        this.validateForm.get(['email'])!.value,
        this.validateForm.get(['password'])!.value
      ).subscribe(
        res => {
          console.log(res);
          if (res.status === 'success') {
            this.adminStorageService.setAdmin(res.admin);
  
            if (this.adminStorageService.isAdminLoggedIn()) {
              // this.router.navigateByUrl('/user-dashboard'); 
              this.router.navigate(['/admin-dashboard']).then(() => {
                window.location.reload();  // Refresh the page after navigation
              });
            } else {
              console.log("User is still not logged in after setting data.");
            }
  
            this.notification.success('SUCCESS', 'Login successful', { nzDuration: 5000 });
          } else {
            this.notification.error('ERROR', res.message, { nzDuration: 5000 });
          }
        },
        error => {
          console.log('Error response:', error);
          let errorMessage = error.error?.message || "An unexpected error occurred.";
          
          this.notification.error('ERROR', errorMessage, { nzDuration: 5000 });
        }
      );
    }
    
}
