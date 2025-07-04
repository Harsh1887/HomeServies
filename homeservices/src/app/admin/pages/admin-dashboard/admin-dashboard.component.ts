import { Component } from '@angular/core';
import { Emp, User } from '../../../basic/models/user.model';
import { AuthService } from '../../../basic/services/auth/auth.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  emp: Emp[] = [];  // Array to hold the users
    users: User[] = [];  // Array to hold the users
  
  loading: boolean = false;  // To indicate loading status
  errorMessage: string = '';  // To show error message, if any

  dashboardData = [
    { title: 'Total Users', value: '5', icon: 'fas fa-users' }, //users count
    { title: 'Total Employees', value: '14', icon: 'fas fa-user-tie' }, //emp count
    { title: 'New Bookings', value: '4', icon: 'fas fa-calendar-check' }, // Pending, accepted, completed
    { title: 'Rejected Bookings', value: '3', icon: 'fas fa-calendar-times' }, //rejected
    { title: 'Employee Pending Payment', value: 'Rs. 1300', icon: 'fas fa-wallet' }, //emp_payment_status = 0
    { title: 'Past Month Sales', value: 'Rs. 0', icon: 'fas fa-chart-line' }, //order . booking_time, past month count
    { title: 'Past Month Rejected', value: '0', icon: 'fas fa-ban' }, ////order . booking_time, past month count where order_status = rejected
    { title: 'Past Month Revenue', value: 'Rs. 0', icon: 'fas fa-coins' } //order . booking_time, past month  order_total_amount sum of all
  ];


  constructor(private authService: AuthService, private router: Router, private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.getEmp();  // Fetch the users when the component initializes
    this.getUsers();  // Fetch the users when the component initializes

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

  getUsers(): void {
    this.loading = true;
    this.authService.getUsers().subscribe(
      (response: any[]) => {  // Use any[] if you're unsure about the structure of the response
        console.log('Fetched Users:', response);  // Log the response to the console

        // Map the response to ensure it fits the User model
        this.users = response.map(item => {
          return {
            id: item.user_id,          // Make sure these properties match your API response
            name: item.user_name,
            email: item.user_email,
            phone: item.user_phoneno,
            address: item.user_address
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
  

}
