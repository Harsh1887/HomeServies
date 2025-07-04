import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Emp, User } from '../../../basic/models/user.model';
import { AuthService } from '../../../basic/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
  orderId: number | null = null; // Dynamically retrieved orderId
  order: any;
  user: User | null = null; // Type user as User model
  emp: Emp | null = null; // Type employee as Employee model
  currentUser: User | null = null;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute, // Add ActivatedRoute
    private userStorageService: UserStorageService
  ) {}

  async ngOnInit(): Promise<void> {
    // Get orderId from the URL query parameters
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId']; // Get orderId from the query string
      console.log('Received orderId:', this.orderId); // Log orderId for debugging

      if (this.orderId) {
        // Fetch order details
        this.fetchOrderData(this.orderId);
      } else {
        console.error('No orderId found in URL');
      }
    });

    // Load the current user
    await this.loadUser();

    if (this.currentUser) {
      console.log('User loaded:', this.currentUser);
    } else {
      this.error = 'User not authenticated.';
      console.error(this.error);
    }
  }

  async loadUser(): Promise<void> {
    return new Promise((resolve) => {
      const user = this.userStorageService.getUser();

      if (user) {
        this.currentUser = user;
        resolve();
      } else {
        console.warn('User not found. Retrying...');
        setTimeout(() => {
          this.currentUser = this.userStorageService.getUser();
          if (!this.currentUser) {
            this.error = 'User could not be loaded.';
          }
          resolve();
        }, 500);
      }
    });
  }

  fetchOrderData(orderId: number): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // First, fetch the order details
    this.http.post('http://localhost/api_homeservices/orders/get_order_by_id.php', { order_id: orderId }, { headers })
      .subscribe(
        (response: any) => {
          console.log('Order Response received:', response);  // Log the response for debugging

          if (response.success) {
            this.order = response.data; // Store order details
            console.log('Order data:', this.order);
            console.log('emp id', this.order.employee_id);

            // After fetching order, fetch the user and employee data
            this.fetchUserData(this.order.user_id);
            this.fetchEmployeeData(this.order.employee_id);
          } else {
            console.error('Error fetching order:', response.message);
          }
        },
        (error) => {
          console.error('Error fetching order:', error);
        }
      );
  }

  fetchUserData(userId: number): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Fetch the user details based on user_id from order
    this.http.post('http://localhost/api_homeservices/orders/get_user_by_id.php', { user_id: userId }, { headers })
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.user = response.data; // Store user data
            console.log('User API Response:', response);  // Check response structure

            console.log('User data:', this.user);
          } else {
            console.error('Error fetching user:', response.message);
          }
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
  }

  fetchEmployeeData(employeeId: number): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Fetch the employee details based on employee_id from order
    this.http.post('http://localhost/api_homeservices/orders/get_emp_by_id.php', { employee_id: employeeId }, { headers })
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.emp = response.data; // Store employee data
            console.log('Employee data:', this.emp);
          } else {
            console.error('Error fetching employee:', response.message);
          }
        },
        (error) => {
          console.error('Error fetching employee:', error);
        }
      );
  }

  getFormattedTime(): string | null {
    try {
      return new Date(`1970-01-01T${this.order.service_time}`).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true  // Set to false for 24-hour format
      });
    } catch {
      return null;
    }
  }
}
