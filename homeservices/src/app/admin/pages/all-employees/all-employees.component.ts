import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Emp } from '../../../basic/models/user.model';
import { AuthService } from '../../../basic/services/auth/auth.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-all-employees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-employees.component.html',
  styleUrl: './all-employees.component.scss'
})
export class AllEmployeesComponent {
  emp: Emp[] = [];  // Array to hold the users
  loading: boolean = false;  // To indicate loading status
  errorMessage: string = '';  // To show error message, if any
        
  

  constructor(private authService: AuthService, private router: Router, private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getEmp();  // Fetch the users when the component initializes
  }

  getEmp(): void {
    this.loading = true;
    this.authService.getAllEmp().subscribe(
      (response: any[]) => {  // Use any[] if you're unsure about the structure of the response
        console.log('Fetched Users:', response);  // Log the response to the console

        // Map the response to ensure it fits the User model
        this.emp = response.map(item => {
          return {
            employee_id: item.employee_id,
            emp_aadhar_number: item.emp_aadhar_number,
            employee_name: item.employee_name,
            employee_service_name: item.employee_service_name,
            employee_image: item.employee_image,
            employee_phoneno: item.employee_phoneno,
            employee_email: item.employee_email,
            employee_desc: item.employee_desc,
            employee_rating: item.employee_rating,
            employee_location: item.employee_location,
            employee_experience: item.employee_experience,
            employee_service_fee: item.employee_service_fee
            // Add any other necessary properties based on your User model
          };
        });

        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load users';  // Show error message
        this.loading = false;
      }
    );
  }


  // Edit Employee
  editEmployee(employee: Emp): void {
    this.router.navigate(['/edit-emp'], { queryParams: { data: JSON.stringify(employee) } });
  }

  // Delete Employee
deleteEmployee(employee_id: number): void {
  if (confirm('Are you sure you want to delete this employee?')) {
    this.authService.deleteEmployee(employee_id).subscribe(
      res => {
        console.log(res);
        if (res.success) {
          // Remove the employee from the list after successful deletion
          this.emp = this.emp.filter(emp => emp.employee_id !== employee_id);

          this.notification.success('SUCCESS', 'Employee deleted successfully', { nzDuration: 5000 });

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

}
