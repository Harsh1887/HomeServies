import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-payment-screen',
  standalone: false,
  templateUrl: './card-payment-screen.component.html',
  styleUrls: ['./card-payment-screen.component.scss']
})
export class CardPaymentScreenComponent implements OnInit {
  orderId: string | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get orderId from query params
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
    });
  }

  completePayment(): void {
    console.log('Card payment successful!');
    
    // Navigate to order success with orderId
    this.router.navigate(['/order-success'], { queryParams: { orderId: this.orderId } });
  }
}
