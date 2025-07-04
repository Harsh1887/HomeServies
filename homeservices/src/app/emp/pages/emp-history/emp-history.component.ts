import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpStorageService } from '../../../basic/services/storage/emp-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emp-history',
   standalone: true,
    imports: [CommonModule],
  templateUrl: './emp-history.component.html',
  styleUrl: './emp-history.component.scss'
})
export class EmpHistoryComponent {
  orders: any[] = [];
  currentEmployee: any = null;
  orderToComplete: any = null;

  constructor(private http: HttpClient, private empStorageService: EmpStorageService) {}

  ngOnInit(): void {
    this.loadEmployee().then(() => {
      if (this.currentEmployee && (this.currentEmployee.employee_id || this.currentEmployee["employee_id "])) {
        const empId = this.currentEmployee.employee_id || this.currentEmployee["employee_id "];

        this.http.post<any[]>('http://localhost/api_homeservices/orders/get_orders_by_employee.php', {
          employee_id: empId
        }).subscribe(data => {
          // Filter orders with status 'accepted' or 'pending'
          this.orders = data.filter(order =>
            order.emp_payment_status === 1 && order.order_status === "successful"
          );

          // For each order, fetch the user_name
          this.orders.forEach(order => {
            this.fetchUserName(order.user_id, order);  // Fetch user name for each order
          });
        });
      } else {
        console.error('Employee ID is missing. Cannot fetch orders.');
      }
    });
  }

  async loadEmployee(): Promise<void> {
    return new Promise((resolve) => {
      const emp = this.empStorageService.getEmp();

      if (emp) {
        this.currentEmployee = emp;
        console.log('Employee successfully loaded:', this.currentEmployee);
        resolve();
      } else {
        console.warn('Employee not found. Retrying...');
        setTimeout(() => {
          this.currentEmployee = this.empStorageService.getEmp();
          if (this.currentEmployee) {
            console.log('Employee loaded after retry:', this.currentEmployee);
          } else {
            console.error('Employee still not authenticated');
          }
          resolve();
        }, 500);  // Retry delay
      }
    });
  }

  // Function to fetch user_name by user_id and update the order
  fetchUserName(userId: number, order: any): void {
    this.http.post<{ user_name: string, error?: string }>('http://localhost/api_homeservices/orders/user_detail.php', {
      user_id: userId
    }).subscribe(response => {
      if (response.user_name) {
        order.user_name = response.user_name;  // Set user name for the order
        console.log(`User name fetched for order ${order.order_id}: ${order.user_name}`);
      } else {
        console.error('Error fetching user name:', response.error);
      }
    }, error => {
      console.error('Error in API call to fetch user name:', error);
    });
  }

}
