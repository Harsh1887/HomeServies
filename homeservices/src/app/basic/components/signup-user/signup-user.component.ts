import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CommonModule } from '@angular/common';
import { catchError, debounceTime, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-signup-user',
  standalone: true,
  imports : [ReactiveFormsModule, CommonModule],
  templateUrl: './signup-user.component.html',
  styleUrl: './signup-user.component.scss'
})
export class SignupUserComponent {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private notification: NzNotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required,  Validators.minLength(3), Validators.pattern(/^[a-zA-Z ]+$/)]],
      email: [null, [Validators.email, Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)], [this.emailExistsValidator(this.authService)]],
      phone: [null, [Validators.required, Validators.pattern(/^[1-9][0-9]{9}$/)]],
      address: [null, [Validators.required, Validators.minLength(10)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)]],
    });
  }

  emailExistsValidator(authService: AuthService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ emailTaken: boolean } | null> => {
      if (!control.value) {
        return of(null);
      }
      
      return authService.validate_email(control.value).pipe(
        debounceTime(500), // Prevents multiple requests
        switchMap(res => {
          return res.emailFound ? of({ emailTaken: true }) : of(null);
        }),
        catchError(() => of(null)) // Prevents API errors from breaking validation
      );
    };
  }
  
  

  submitForm() {

    this.authService.user_signup(
      this.validateForm.value.name,
      this.validateForm.value.email,
      this.validateForm.value.phone,
      this.validateForm.value.address,
      this.validateForm.value.password
    ).subscribe(
      res => {
        if (res.status === "success") {
          this.notification.success('SUCCESS', `Signup successful`, { nzDuration: 5000 });
          this.validateForm.reset(); // Clear form after successful signup
          this.router.navigateByUrl('/login');
        } else {
          this.notification.error('ERROR', res.message, { nzDuration: 5000 });
        }
      },
      error => {
        this.notification.error('ERROR', `${error.error}`, { nzDuration: 5000 });
      }
    );
  }
  }
  

