import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpStorageService } from '../../../basic/services/storage/emp-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {

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
            order.order_status === 'accepted' || order.order_status === 'Pending' || order.order_status === 'completed'
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

  updateStatus(orderId: number, status: string) {
    const confirmMsg = `Are you sure you want to ${status.toUpperCase()} this order?`;

    if (window.confirm(confirmMsg)) {
      this.http.post('http://localhost/api_homeservices/orders/update_accept_reject_status.php', {
        order_id: orderId,
        order_status: status
      }).subscribe(() => {
        if (status === 'accepted') {
          this.orders = this.orders.map(order => {
            if (order.order_id === orderId) {
              return { ...order, order_status: status, showComplete: true }; // Show complete order button after accepting
            }
            return order;
          });
        } else {
          this.ngOnInit(); // Re-fetch data
        }
      });
    }
  }

  // Show 'Complete Order' button after order is accepted
  completeOrder(orderId: number) {
    const confirmMsg = "Are you sure you want to mark this order as completed?";
    if (window.confirm(confirmMsg)) {
      this.orderToComplete = this.orders.find(order => order.order_id === orderId);
      if (this.orderToComplete) {
        this.showPaymentOptions(orderId);
      }
    }
  }

  // Show payment options after confirming order completion
  showPaymentOptions(orderId: number) {
    const paymentMethod = window.prompt('Select payment method:\nType "card" for Card Payment\nType "upi" for UPI Payment');

    if (paymentMethod === 'card' || paymentMethod === 'upi') {
      const confirmMsg = `You selected ${paymentMethod.toUpperCase()} payment method. Do you confirm?`;
      if (window.confirm(confirmMsg)) {
        this.updatePaymentStatus(orderId, paymentMethod);
      }
    } else {
      alert('Invalid selection or cancelled');
    }
  }

 
updatePaymentStatus(orderId: number, paymentStatus: string) {
  // First update the payment status
  this.http.post('http://localhost/api_homeservices/orders/update_payment_status.php', {
    order_id: orderId,
    payment_status: paymentStatus
  }).subscribe(() => {
    // After payment status is updated, update the order status to 'completed'
    this.http.post('http://localhost/api_homeservices/orders/update_accept_reject_status.php', {
      order_id: orderId,
      order_status: 'completed' // Set the order status to 'completed'
    }).subscribe(() => {
      // Update the local order list to reflect both payment status and order status
      this.orders = this.orders.map(order => {
        if (order.order_id === orderId) {
          return { 
            ...order, 
            order_payment_status: paymentStatus,  // Update payment status
            order_status: 'completed'  // Update order status
          };
        }
        return order;
      });
      alert(`Payment method "${paymentStatus}" selected for order ID ${orderId}. Order status updated to completed.`);
    }, error => {
      console.error('Error updating order status to completed:', error);
      alert('Failed to update order status to completed.');
    });
  }, error => {
    console.error('Error updating payment status:', error);
    alert('Failed to update payment status.');
  });
}

isOrderReadyToComplete(serviceDate: string, serviceTime: string): boolean {
  const current = new Date();
  const [year, month, day] = serviceDate.split('-').map(Number);
  const [hour, minute] = serviceTime.split(':').map(Number);

  const serviceDateTime = new Date(year, month - 1, day, hour, minute);

  return current >= serviceDateTime;
}


}
