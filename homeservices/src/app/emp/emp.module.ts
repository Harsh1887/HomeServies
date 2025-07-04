import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpRoutingModule } from './emp-routing.module';
import { EmpComponent } from './emp.component';
import { EmpDashboardComponent } from './pages/emp-dashboard/emp-dashboard.component';
import { MyTasksComponent } from './pages/my-tasks/my-tasks.component';
import { AwaitPayComponent } from './pages/await-pay/await-pay.component';
import { EmpHistoryComponent } from './pages/emp-history/emp-history.component';
import { RejectServicesComponent } from './pages/reject-services/reject-services.component';
import { EmpProfileComponent } from './pages/emp-profile/emp-profile.component';
import { EmpLogoutComponent } from './pages/emp-logout/emp-logout.component';


@NgModule({
  declarations: [
    EmpComponent,
    // EmpDashboardComponent,
    // AwaitPayComponent,
    // EmpHistoryComponent,
    // RejectServicesComponent,
    // EmpProfileComponent,
    EmpLogoutComponent
  ],
  imports: [
    CommonModule,
    EmpRoutingModule
  ]
})
export class EmpModule { }
