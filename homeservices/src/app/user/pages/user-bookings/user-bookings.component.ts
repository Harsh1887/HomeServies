import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Emp } from '../../../basic/models/user.model';  // Assuming Emp model is correct
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-bookings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss']
})
export class UserBookingsComponent implements OnInit {
  currentUser: any = null;
  userOrders: any[] = [];
  employeeDetails: Emp[] = [];

  constructor(
    private http: HttpClient,
    private userStorageService: UserStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    const user = this.userStorageService.getUser();
    if (user) {
      this.currentUser = user;
      this.fetchOrders();
    } else {
      console.error('User not logged in');
    }
  }
  
  fetchOrders(): void {
    const payload = { user_id: this.currentUser.id };  // Use user.id here
    console.log(payload);
    this.http.post<any[]>('http://localhost/api_homeservices/orders/get_orders_by_user.php', payload)
      .subscribe(
        (response) => {
          // Filter orders to show only those with status 'Pending', 'Accepted', or 'Completed'
          this.userOrders = response.filter(order => order.order_status === 'Pending' || order.order_status === 'accepted' || order.order_status === 'completed');
          console.log('Filtered User Orders:', this.userOrders);
          
          // After fetching orders, fetch employee details for each order
          this.userOrders.forEach(order => {
            this.fetchEmployeeDetails(order.employee_id);
          });
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
  }
  
  fetchEmployeeDetails(employeeId: string): void {
    const payload = { employee_id: employeeId };
    console.log('Fetching employee details for ID:', employeeId);
    
    this.http.post<Emp>('http://localhost/api_homeservices/orders/get_employee_by_id.php', payload)
      .subscribe(
        (response: Emp) => {
          // Assuming response matches Emp model, pushing to employeeDetails array
          this.employeeDetails.push(response);  
          console.log('Employee Details:', response);
        },
        (error) => {
          console.error('Error fetching employee details:', error);
        }
      );
  }

  // Helper methods to retrieve employee details from employeeDetails array
  getEmployeeName(employeeId: number): string {
    const employee = this.employeeDetails.find(emp => emp.employee_id === employeeId);
    return employee ? employee.employee_name : 'Not Available';
  }

  getEmployeeServiceName(employeeId: number): string {
    const employee = this.employeeDetails.find(emp => emp.employee_id === employeeId);
    return employee ? employee.employee_service_name : 'Not Available';
  }

  getEmployeeEmail(employeeId: number): string {
    const employee = this.employeeDetails.find(emp => emp.employee_id === employeeId);
    return employee ? employee.employee_email : 'Not Available';
  }

  getEmployeePhoneNo(employeeId: number): number {
    const employee = this.employeeDetails.find(emp => emp.employee_id === employeeId);
    return employee ? employee.employee_phoneno : 7894562130;
  }

  getEmployeeRating(employeeId: number): number {
    const employee = this.employeeDetails.find(emp => emp.employee_id === employeeId);
    return employee ? employee.emp_aadhar_number : 0 ;
  }

  getEmployeeImage(employeeId: number): string {
    const employee = this.employeeDetails.find(emp => emp.employee_id === employeeId);
    return employee ? employee.employee_image : 'default_image.jpg';  // Provide a default image if not available
  }
  goToUpiPayment(orderId: string): void {
    this.router.navigate(['/upi-payment'], { queryParams: { orderId } });
  }
  
  goToCardPayment(orderId: string): void {
    this.router.navigate(['/card-payment'], { queryParams: { orderId } });
  }
}
