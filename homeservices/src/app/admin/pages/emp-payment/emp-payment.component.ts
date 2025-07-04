import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emp-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emp-payment.component.html',
  styleUrls: ['./emp-payment.component.scss']
})
export class EmpPaymentComponent implements OnInit {
  orders: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAllOrders();
  }

  fetchAllOrders(): void {
    this.http.get<any>('http://localhost/api_homeservices/orders/get_all_orders.php')
      .subscribe(
        (response) => {
          if (response.success) {
            this.orders = response.allOrderTable.filter((order: any) =>
              order.order_status.toLowerCase() === 'successful' && order.emp_payment_status === '0'
            );
          } else {
            console.warn('No orders found');
          }
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
  }

  confirmPayment(order: any): void {
    const confirmPay = confirm(`Do you want to mark payment done for Employee ID: ${order.employee_id}?`);
    if (confirmPay) {
      this.http.post<any>('http://localhost/api_homeservices/orders/update_emp_payment_status.php', {
        order_id: order.order_id
      }).subscribe(
        (response) => {
          if (response.success) {
            alert('Payment marked successfully.');
            this.fetchAllOrders(); // Refresh the list
          } else {
            alert('Failed to update payment status.');
          }
        },
        (error) => {
          console.error('Error updating payment:', error);
          alert('Error while updating payment.');
        }
      );
    }
  }
}
