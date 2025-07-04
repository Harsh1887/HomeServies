import { Component } from '@angular/core';
import { Emp } from '../../../basic/models/user.model';
import { CommonModule } from '@angular/common';
import { EmpStorageService } from '../../../basic/services/storage/emp-storage.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-emp-dashboard',
  standalone: true,
      imports: [CommonModule],
  templateUrl: './emp-dashboard.component.html',
  styleUrl: './emp-dashboard.component.scss'
})
export class EmpDashboardComponent {
    empData: Emp | null = null;
    orders: any[] = [];

    currentEmployee: any = null;
  
  dashboardData = [
    { title: 'Total Completed Orders', value: '', icon: 'fas fa-check-circle' },//order_status = completed count
    { title: 'Pending & Ongoing Orders', value: '', icon: 'fas fa-spinner' },//order_status = pending & accepted count total
    { title: 'Earnings Summary', value: '', icon: 'fas fa-wallet' }, //order_status = successful, emp_payment_status=1, sum of all pay_amount to emp in this condition
    { title: 'Pending Payment', value: '', icon: 'fas fa-wallet' } //order_status = successful, emp_payment_status=0, count of such 

  ];

  constructor(private http: HttpClient, private empStorageService: EmpStorageService) {}
  
    ngOnInit(): void {
      this.empData = this.empStorageService.getEmp();
      this.http.post<any[]>('http://localhost/api_homeservices/orders/get_orders_by_employee.php', {
        employee_id: this.empData?.employee_id,
      }).subscribe(data => {
        // Save all orders initially
        this.orders = data.filter(order =>
          order.order_status === 'accepted' || order.order_status === 'Pending' || order.order_status === 'completed'
        );
      
        // 1. Total Completed Orders (order_status = 'completed')
        const completedOrders = data.filter(order => order.order_status === 'successful').length;
      
        // 2. Pending & Ongoing Orders (order_status = 'pending' or 'accepted')
        const pendingAndOngoingOrders = data.filter(order =>
          order.order_status === 'Pending' || order.order_status === 'accepted'
        ).length;
              
        // 3. Earnings Summary
        const earnings = 480
      
        // 4. Pending Payment
        const pendingPayments = data.filter(order =>
          order.order_status === 'successful' && order.emp_payment_status === 0
        ).length;
      
        // Assign to dashboardData
        this.dashboardData[0].value = completedOrders.toString();
        this.dashboardData[1].value = pendingAndOngoingOrders.toString();
        this.dashboardData[2].value = `₹${earnings.toFixed(2)}`;
        this.dashboardData[3].value = pendingPayments.toString();
      });
      
    }

}
