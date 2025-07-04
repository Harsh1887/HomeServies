import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { EmpStorageService } from '../../services/storage/emp-storage.service';
@Component({
  selector: 'app-login-employee',
  standalone: true,
  imports : [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login-employee.component.html',
  styleUrl: './login-employee.component.scss'
})
export class LoginEmployeeComponent {
  validateForm!: FormGroup;
  isEmpLoggedIn: boolean = false;

  
    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private notification: NzNotificationService,
      private router: Router,
      private empStorageService: EmpStorageService
    ) {}
  
    ngOnInit() {
      this.validateForm = this.fb.group({
        employee_email: [null, [Validators.email, Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]],
        employee_password: [null, [Validators.required, Validators.minLength(6)]],
      });
      this.isEmpLoggedIn = this.empStorageService.isEmpLoggedIn();
    }

    submitForm() {
      this.authService.emp_login(
        this.validateForm.get(['employee_email'])!.value,
        this.validateForm.get(['employee_password'])!.value
      ).subscribe(
        res => {
          console.log(res);
          if (res.status === 'success') {
            this.empStorageService.setEmp(res.emp);
  
            if (this.empStorageService.isEmpLoggedIn()) {
              // this.router.navigateByUrl('/user-dashboard'); 
              this.router.navigate(['/emp-dashboard']).then(() => {
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
