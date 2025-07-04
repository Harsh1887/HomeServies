import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-emp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.css']
})
export class EditEmpComponent implements OnInit {
  registerForm: FormGroup;
  successMessage: string | undefined;
  errorMessage: string | undefined;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.registerForm = this.fb.group({
      employee_id: [''],
      emp_aadhar_number: ['', [Validators.required, Validators.pattern(/^[2-9]{1}[0-9]{11}$/)]],
      employee_name: ['', [Validators.required, Validators.minLength(2)]],
      employee_service_name: ['', Validators.required],
      employee_phoneno: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      employee_email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      employee_desc: ['', [Validators.required, Validators.minLength(10)]],
      employee_location: ['', Validators.required],
      employee_experience: ['', [Validators.required, Validators.min(0)]],
      employee_service_fee: ['', [Validators.required, Validators.min(1), Validators.max(2000)]]
    });
  }

  ngOnInit(): void {
    // Retrieve the query parameters from the URL
    this.route.queryParams.subscribe(params => {
      // Populate the form fields with the data from the query string
      this.registerForm.patchValue({
        employee_id: params['employee_id'],
        emp_aadhar_number: params['emp_aadhar_number'],
        employee_name: params['employee_name'],
        employee_service_name: params['employee_service_name'],
        employee_phoneno: params['employee_phoneno'],
        employee_email: params['employee_email'],
        employee_desc: params['employee_desc'],
        employee_location: params['employee_location'],
        employee_experience: params['employee_experience'],
        employee_service_fee: params['employee_service_fee']
      });
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    const formData = new FormData();
    formData.append('employee_id', this.registerForm.value.employee_id);
    formData.append('emp_aadhar_number', this.registerForm.value.emp_aadhar_number);
    formData.append('employee_name', this.registerForm.value.employee_name);
    formData.append('employee_service_name', this.registerForm.value.employee_service_name);
    formData.append('employee_phoneno', this.registerForm.value.employee_phoneno);
    formData.append('employee_email', this.registerForm.value.employee_email);
    formData.append('employee_desc', this.registerForm.value.employee_desc);
    formData.append('employee_location', this.registerForm.value.employee_location);
    formData.append('employee_experience', this.registerForm.value.employee_experience);
    formData.append('employee_service_fee', this.registerForm.value.employee_service_fee);

    this.http.post('http://localhost/api_homeservices/employee/update_emp.php', formData).subscribe(
      (response: any) => {
        if (response.status === 'success') {
          this.successMessage = 'Employee details updated successfully!';
        } else {
          this.errorMessage = response.message;
        }
      },
      (error) => {
        this.errorMessage = 'There was an error updating employee details.';
      }
    );
  }
}
