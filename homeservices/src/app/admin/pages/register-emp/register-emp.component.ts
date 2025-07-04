import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../basic/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-emp',
  templateUrl: './register-emp.component.html',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  styleUrls: ['./register-emp.component.scss']
})
export class RegisterEmpComponent {
  registerForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      emp_aadhar_number: ['', [Validators.required, Validators.pattern(/^[2-9]{1}[0-9]{11}$/), Validators.minLength(12)]],
      employee_name: ['', [Validators.required, Validators.minLength(2)]],
      employee_service_name: ['', Validators.required],
      employee_image: [null, Validators.required],
      employee_phoneno: ['', [Validators.required, Validators.pattern(/^[1-9]\d{9}$/)]],
      employee_email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          )
        ]
      ],
       employee_password: ['', [Validators.required, Validators.minLength(6)]],
      employee_desc: ['', [Validators.required, Validators.minLength(10)]],
      employee_location: ['', Validators.required],
      employee_experience: ['', [Validators.required, Validators.min(0)]],
      employee_service_fee: ['', [Validators.required, Validators.min(1), Validators.max(2000)]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.registerForm.patchValue({ employee_image: file });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      Object.keys(this.registerForm.controls).forEach(key => {
        const control = this.registerForm.get(key);
        if (control) {
          formData.append(key, control.value);
        }
      });

      this.authService.registerEmployee(formData).subscribe(
        response => {
          alert(response.message);
          this.registerForm.reset();
          this.imagePreview = null;
        },
        error => {
          console.error('Registration Failed', error);
        }
      );
    }
  }
}
