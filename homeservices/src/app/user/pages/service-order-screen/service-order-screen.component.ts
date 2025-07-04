import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-service-order-screen',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './service-order-screen.component.html',
  styleUrl: './service-order-screen.component.scss'
})

export class ServiceOrderScreenComponent {
  employee: any = {};
  currentUser: any = null;

  serviceDate: string = '';
  serviceTime: string = '';
  showConfirmation: boolean = false;
  minDate: string = '';
  maxDate: string = '';
  availableTimes: string[] = [];

  // Variables to store current user details
  user_address: string = '';
  user_name: string = '';
  user_phoneno: string = '';
  user_id: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private userStorageService: UserStorageService, private router: Router) { }

  ngOnInit(): void {
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);

    // Convert to yyyy-MM-dd format for input[type="date"]
    this.minDate = today.toISOString().split('T')[0];
    this.maxDate = nextMonth.toISOString().split('T')[0];

    this.generateAvailableTimes();

    this.route.queryParams.subscribe(params => {
      this.employee = {
        employee_id: params['employee_id'],
        emp_aadhar_number: params['emp_aadhar_number']?.toString() || '',
        employee_name: decodeURIComponent(params['employee_name'] || ''),
        employee_service_name: decodeURIComponent(params['employee_service_name'] || ''),
        employee_image: decodeURIComponent(params['employee_image'] || ''),
        employee_phoneno: params['employee_phoneno']?.toString() || '',
        employee_email: decodeURIComponent(params['employee_email'] || ''),
        employee_desc: decodeURIComponent(params['employee_desc'] || ''),
        employee_rating: params['employee_rating'] || '',
        employee_location: decodeURIComponent(params['employee_location'] || ''),
        employee_experience: params['employee_experience'] || '',
        employee_service_fee: params['employee_service_fee'] || 0
      };
    });



    // Retrieve user data
    this.currentUser = this.userStorageService.getUser();
    console.log("Retrieved User:", this.currentUser); // Debugging

    if (this.currentUser) {
      this.user_id = this.currentUser.id;  // Fix key name
      this.user_name = this.currentUser.name;  // Fix key name
      this.user_phoneno = this.currentUser.phone;  // Fix key name
      this.user_address = this.currentUser.address;  // Fix key name
    } else {
      console.warn("No user data found in storage!");
      this.user_id = '';
      this.user_name = '';
      this.user_phoneno = '';
      this.user_address = '';
    }
  }

  generateAvailableTimes(): void {
    const startHour = 8;
    const endHour = 22;
    const intervalMinutes = 30;
    const times: string[] = [];

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let min = 0; min < 60; min += intervalMinutes) {
        if (hour === endHour && min > 0) break; // Stop after 10:00 PM

        const h = hour % 12 === 0 ? 12 : hour % 12;
        const m = min.toString().padStart(2, '0');
        const period = hour < 12 ? 'AM' : 'PM';
        times.push(`${h}:${m} ${period}`);
      }
    }

    this.availableTimes = times;
  }


  confirmBooking(): void {
    if (!this.serviceDate || !this.serviceTime) {
      alert("Please select a valid date and time for the service.");
      return;
    }

    const confirmation = confirm(
      `Confirm Booking? \n\nAddress: ${this.user_address} \nPhone: ${this.user_phoneno}`
    );

    if (confirmation) {
      const payAmountToEmp = this.employee.employee_service_fee * 0.8; // 20% less

      const bookingData = {
        user_id: this.user_id,
        employee_id: this.employee.employee_id,
        order_total_amount: parseFloat(this.employee.employee_service_fee), // Ensure it's a number
        pay_amount_to_emp: payAmountToEmp, // Ensure this is a number
        emp_payment_status: "Pending",
        order_payment_status: "Pending",
        user_address: this.user_address,
        user_phoneno: this.user_phoneno,
        service_date: this.serviceDate,
        service_time: this.serviceTime,
        booking_time: new Date().toISOString(),
        order_status: "Pending",
        order_location: this.employee.employee_location
      };

      console.log('Booking Data:', bookingData);
      console.log('user_id:', this.user_id);
      console.log('employee_id:', this.employee.employee_id);
      console.log('order_total_amount:', parseFloat(this.employee.employee_service_fee));
      console.log('pay_amount_to_emp:', payAmountToEmp);
      console.log('emp_payment_status:', "Pending");
      console.log('order_payment_status:', "Pending");
      console.log('user_address:', this.user_address);
      console.log('user_phoneno:', this.user_phoneno);
      console.log('service_date:', this.serviceDate);
      console.log('service_time:', this.serviceTime);
      console.log('booking_time:', new Date().toISOString());
      console.log('order_status:', "Pending");
      console.log('order_location:', this.employee.employee_location);




      // Send API request
      this.http.post("http://localhost/api_homeservices/orders/new_order.php", bookingData)
        .subscribe({
          next: (response) => {
            console.log("Booking Response:", response);
            alert("Service booked successfully!");
              // Redirect to /user-dashboard
              window.scrollTo(0, 0);
              this.router.navigate(['/user-dashboard']);
          },
          error: (error) => {
            console.error("Booking Error:", error);
            console.log("Error Details:", error.error); // This will log the server error message

            alert("Booking failed! Please check the console for details.");
          }
        });
    }
  }
}
