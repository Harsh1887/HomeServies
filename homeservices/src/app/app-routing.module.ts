import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupUserComponent } from './basic/components/signup-user/signup-user.component';
import { SignupEmpComponent } from './basic/components/signup-emp/signup-emp.component';
import { LoginComponent } from './basic/components/login/login.component';
import { LoginAdminComponent } from './basic/components/login-admin/login-admin.component';
import { LoginEmployeeComponent } from './basic/components/login-employee/login-employee.component';
import { UserDashboardComponent } from './user/pages/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin/pages/admin-dashboard/admin-dashboard.component';
import { EmpDashboardComponent } from './emp/pages/emp-dashboard/emp-dashboard.component';
import { UserWishlistComponent } from './user/pages/user-wishlist/user-wishlist.component';
import { UserBookingsComponent } from './user/pages/user-bookings/user-bookings.component';
import { UserHistoryComponent } from './user/pages/user-history/user-history.component';
import { UserProfileComponent } from './user/pages/user-profile/user-profile.component';
import { UserLogoutComponent } from './user/pages/user-logout/user-logout.component';
import { AllUsersComponent } from './admin/pages/all-users/all-users.component';
import { AllEmployeesComponent } from './admin/pages/all-employees/all-employees.component';
import { RegisterEmpComponent } from './admin/pages/register-emp/register-emp.component';
import { EditEmpComponent } from './admin/pages/edit-emp/edit-emp.component';
import { ActiveBookingsComponent } from './admin/pages/active-bookings/active-bookings.component';
import { EmpPaymentComponent } from './admin/pages/emp-payment/emp-payment.component';
import { ServiceHistoryComponent } from './admin/pages/service-history/service-history.component';
import { AdminProfileComponent } from './admin/pages/admin-profile/admin-profile.component';
import { AdminLogoutComponent } from './admin/pages/admin-logout/admin-logout.component';
import { MyTasksComponent } from './emp/pages/my-tasks/my-tasks.component';
import { AwaitPayComponent } from './emp/pages/await-pay/await-pay.component';
import { EmpHistoryComponent } from './emp/pages/emp-history/emp-history.component';
import { RejectServicesComponent } from './emp/pages/reject-services/reject-services.component';
import { EmpProfileComponent } from './emp/pages/emp-profile/emp-profile.component';
import { EmpLogoutComponent } from './emp/pages/emp-logout/emp-logout.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { ServiceOrderScreenComponent } from './user/pages/service-order-screen/service-order-screen.component';
import { UserPaymentScreenComponent } from './user/pages/user-payment-screen/user-payment-screen.component';
import { CardPaymentScreenComponent } from './user/pages/card-payment-screen/card-payment-screen.component';
import { UpiPaymentScreenComponent } from './user/pages/upi-payment-screen/upi-payment-screen.component';
import { OrderSuccessComponent } from './user/pages/order-success/order-success.component';
import { BillComponent } from './user/pages/bill/bill.component';

const routes: Routes = [
  // { path: '', redirectTo: '/home', pathMatch: 'full' , component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'register-user', component: SignupUserComponent },
  { path: 'user-login', component: LoginComponent },
  { path: 'admin-login', component: LoginAdminComponent },
  { path: 'emp-login', component: LoginEmployeeComponent },

  //USER PAGES
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'user-wishlist', component: UserWishlistComponent },
  { path: 'user-bookings', component: UserBookingsComponent },
  { path: 'user-history', component: UserHistoryComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'user-logout', component: UserLogoutComponent },
  { path: 'emp-detail-screen', component: ServiceOrderScreenComponent },
  { path: 'user-payment-screen', component: UserPaymentScreenComponent },
  { path: 'card-payment', component: CardPaymentScreenComponent },
  { path: 'upi-payment', component: UpiPaymentScreenComponent },
  { path: 'order-success', component: OrderSuccessComponent },
  { path: 'bill', component: BillComponent },




  //ADMIN PAGES
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'all-users', component: AllUsersComponent },
  { path: 'all-emp', component: AllEmployeesComponent },
  { path: 'register-emp', component: RegisterEmpComponent },
  { path: 'edit-emp', component: EditEmpComponent },
  { path: 'all-active-bookings', component: ActiveBookingsComponent },
  { path: 'emp-payment-admin', component: EmpPaymentComponent },
  { path: 'all-services-history', component: ServiceHistoryComponent },
  { path: 'admin-profile', component: AdminProfileComponent },
  { path: 'admin-logout', component: AdminLogoutComponent },

  //EMP PAGES
  { path: 'emp-dashboard', component: EmpDashboardComponent },
  { path: 'emp-tasks', component: MyTasksComponent },
  { path: 'emp-await-pay', component: AwaitPayComponent },
  { path: 'emp-history', component: EmpHistoryComponent },
  { path: 'emp-reject', component: RejectServicesComponent },
  { path: 'emp-profile', component: EmpProfileComponent },
  { path: 'emp-logout', component: EmpLogoutComponent },



  //ORDERS, PAYMENT, VIEW_ITEMS
  



  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'emp', loadChildren: () => import('./emp/emp.module').then(m => m.EmpModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
