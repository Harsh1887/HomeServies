import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './basic/components/login/login.component';
import { SignupComponent } from './basic/components/signup/signup.component';
import { provideNzI18n } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminDashboardComponent } from './admin/pages/admin-dashboard/admin-dashboard.component';
import { SignupEmpComponent } from './basic/components/signup-emp/signup-emp.component';
import { LoginAdminComponent } from './basic/components/login-admin/login-admin.component';
import { UserStorageService } from './basic/services/storage/user-storage.service';
import { AllUsersComponent } from './admin/pages/all-users/all-users.component';
import { AllEmployeesComponent } from './admin/pages/all-employees/all-employees.component';
import { RegisterEmpComponent } from './admin/pages/register-emp/register-emp.component';
import { EditEmpComponent } from './admin/pages/edit-emp/edit-emp.component';
import { ActiveBookingsComponent } from './admin/pages/active-bookings/active-bookings.component';
import { EmpPaymentComponent } from './admin/pages/emp-payment/emp-payment.component';
import { ServiceHistoryComponent } from './admin/pages/service-history/service-history.component';
import { AdminProfileComponent } from './admin/pages/admin-profile/admin-profile.component';
import { AdminLogoutComponent } from './admin/pages/admin-logout/admin-logout.component';
import { AuthService } from './basic/services/auth/auth.service';
import { HomeComponent } from './home/home/home.component';
import { UserDashboardComponent } from './user/pages/user-dashboard/user-dashboard.component';
import { ServiceOrderScreenComponent } from './user/pages/service-order-screen/service-order-screen.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// import { UserLogoutComponent } from './user/pages/user-logout/user-logout.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    AdminDashboardComponent,
    // RegisterEmpComponent,
    SignupEmpComponent,
    // EditEmpComponent,
    // ActiveBookingsComponent,
    // EmpPaymentComponent,
    // ServiceHistoryComponent,
    // AdminProfileComponent,
    AdminLogoutComponent,
    HomeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    LoginComponent,
    ServiceOrderScreenComponent,
    LoginAdminComponent,
    // UserDashboardComponent,
    // RegisterEmpComponent,
    AllUsersComponent,
    AllEmployeesComponent,
    // UserLogoutComponent
    // UserStorageService
    // LoginEmployeeComponent,
    MatSnackBarModule
  ],
  providers: [
    provideNzI18n(en_US),
    provideAnimationsAsync(),
    provideHttpClient(),
    AuthService, UserStorageService, RegisterEmpComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
