import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-active-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './active-bookings.component.html',
  styleUrls: ['./active-bookings.component.scss']
})
export class ActiveBookingsComponent implements OnInit {
  
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
            // Filter only successful orders
            this.orders = response.allOrderTable.filter((order: any) => 
              order.order_status === 'Pending' || order.order_status === 'accepted' || order.order_status === 'completed'
            );
            console.log('Filtered Successful Orders:', this.orders);
          } else {
            console.warn('No orders found');
          }
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
  }


}
