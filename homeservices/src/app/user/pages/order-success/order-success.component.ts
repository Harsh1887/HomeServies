
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {
  orderId: string | null = null;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Get order ID from URL query parameters
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
    });
  }

  updateOrderStatus(): void {
    if (this.orderId) {
      const confirmed = window.confirm('Are you sure you want to mark this order as successful?');

      if (confirmed) {
        const payload = { order_id: this.orderId, order_status: 'successful' };

        this.http.post('http://localhost/api_homeservices/orders/update_accept_reject_status.php', payload)
          .subscribe(
            () => {
              // Show success snackbar
              this.snackBar.open('Order status updated successfully!', 'Close', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              });

              // Navigate and scroll to top
              this.router.navigate(['/user-dashboard']).then(() => {
                window.scrollTo(0, 0);
              });
            },
            (error) => {
              console.error('Error updating order status:', error);
              this.snackBar.open('Failed to update order status', 'Close', {
                duration: 3000,
                panelClass: ['error-snackbar']
              });
            }
          );
      }
    }
  }
}
