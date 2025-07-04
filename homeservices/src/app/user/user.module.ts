import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { UserWishlistComponent } from './pages/user-wishlist/user-wishlist.component';
import { UserBookingsComponent } from './pages/user-bookings/user-bookings.component';
import { UserHistoryComponent } from './pages/user-history/user-history.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserLogoutComponent } from './pages/user-logout/user-logout.component';
import { ServiceOrderScreenComponent } from './pages/service-order-screen/service-order-screen.component';
import { UserPaymentScreenComponent } from './pages/user-payment-screen/user-payment-screen.component';
import { CardPaymentScreenComponent } from './pages/card-payment-screen/card-payment-screen.component';
import { UpiPaymentScreenComponent } from './pages/upi-payment-screen/upi-payment-screen.component';
import { FormsModule } from '@angular/forms';
import { OrderSuccessComponent } from './pages/order-success/order-success.component';
import { BillComponent } from './pages/bill/bill.component';


@NgModule({
  declarations: [
    UserComponent,
    // UserDashboardComponent,
    // UserWishlistComponent,
    // UserBookingsComponent,
    // UserHistoryComponent,
    // UserProfileComponent,
    UserLogoutComponent,
    // ServiceOrderScreenComponent,
    UserPaymentScreenComponent,
    CardPaymentScreenComponent,
    UpiPaymentScreenComponent,
    // BillComponent,
    // OrderSuccessComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ServiceOrderScreenComponent,
    UserRoutingModule
  ]
})
export class UserModule { }
