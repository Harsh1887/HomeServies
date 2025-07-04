import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-upi-payment-screen',
  standalone: false,
  templateUrl: './upi-payment-screen.component.html',
  styleUrls: ['./upi-payment-screen.component.scss']
})
export class UpiPaymentScreenComponent implements OnInit {
  orderId: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
    });
  }

  paymentSuccess(): void {
    console.log('UPI payment successful!');

    // Navigate to order success screen with orderId
    this.router.navigate(['/order-success'], { queryParams: { orderId: this.orderId } });
  }
}
