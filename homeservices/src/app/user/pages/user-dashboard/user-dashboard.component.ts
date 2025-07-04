import { Component, Input, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../basic/services/auth/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements AfterViewInit {
  emp: any[] = [];
  searchQuery: string = '';
  selectedService: string = '';
  loading: boolean = true;
  selectedLocation: string = '';
  currentUser: any = null;   // ✅ Initialize as null
  favoriteStatus: Map<string, boolean> = new Map<string, boolean>();

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private userStorageService: UserStorageService
  ) {}

  // ✅ Ensures user is loaded before fetching employees
  async ngAfterViewInit(): Promise<void> {
    await this.loadUser();
  
    if (this.currentUser) {
      console.log('User loaded:', this.currentUser);
      // this.fetchFavorites(user.id);  // Fetch the user's current favorites

      this.fetchEmployees();
    } else {
      console.error('User not authenticated');
    }
  }
  

  // ✅ Improved user loading with retries
  async loadUser(): Promise<void> {
    return new Promise((resolve) => {
      const user = this.userStorageService.getUser();

      if (user) {
        this.currentUser = user;
        console.log('User successfully loaded:', this.currentUser);
        resolve();
      } else {
        console.warn('User not found. Retrying...');
        setTimeout(() => {
          this.currentUser = this.userStorageService.getUser();
          if (this.currentUser) {
            console.log('User loaded after retry:', this.currentUser);
            resolve();
          } else {
            console.error('User still not authenticated');
            resolve();
          }
        }, 500);  // Retry delay
      }
    });
  }

  // Fetch the user's favorites from the backend and update the favoriteStatus map
  fetchFavorites(userId: string): void {
    const formData = new FormData();
    formData.append('user_id', userId);

    this.http.post<{ success: boolean, favorites: any[] }>(
      'http://localhost/api_homeservices/favorite/validate_favorite.php',
      formData
    ).subscribe(response => {
      if (response.success) {
        response.favorites.forEach(fav => {
          this.favoriteStatus.set(fav.employee_id, true);  // Set as favorite
        });
      }
    });
  }
  

  fetchEmployees(): void {
    this.authService.getAllEmp().subscribe(
      (response) => {
        this.emp = response;
        this.loading = false;
  
        // ✅ Initialize favorite status map
        this.emp.forEach(employee => {
          this.favoriteStatus.set(employee.employee_id, false);
        });
  
        // ✅ Fetch existing favorites after loading employees
        this.fetchFavorites(this.currentUser.id);
  
      },
      (error) => {
        console.error("Error fetching employees:", error);
        this.loading = false;
      }
    );
  }
  

  toggleFavorite(employeeId: string): void {
    const userId = this.currentUser.id; // Get the user ID
    const isCurrentlyFavorite = this.favoriteStatus.get(employeeId) || false;

    const url = isCurrentlyFavorite
      ? 'http://localhost/api_homeservices/favorite/delete.php'  // Delete favorite
      : 'http://localhost/api_homeservices/favorite/add.php';    // Add favorite

    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('employee_id', employeeId);

    this.http.post<{ success: boolean, message: string }>(url, formData)
      .subscribe(response => {
        if (response.success) {
          this.favoriteStatus.set(employeeId, !isCurrentlyFavorite); // Update the favorite status
        } else {
          console.error('Failed to toggle favorite:', response.message);
        }
      });
  }
  

  // ✅ Handle Search Input
  updateSearchQuery(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  updateSelectedLocation(event: Event): void {
    this.selectedLocation = (event.target as HTMLSelectElement).value;
  }

  updateSelectedService(event: Event): void {
    this.selectedService = (event.target as HTMLSelectElement).value;
  }

  get uniqueServices(): string[] {
    return [...new Set(this.emp.map(employee => employee.employee_service_name))];
  }

  get uniqueLocations(): string[] {
    return [...new Set(this.emp.map(employee => employee.employee_location))];
  }

  filteredEmployees(): any[] {
    const query = this.searchQuery.trim().toLowerCase();
    return this.emp.filter(employee =>
      (!query ||
        employee.employee_name.toLowerCase().includes(query) ||
        employee.employee_service_name.toLowerCase().includes(query)
      ) &&
      (!this.selectedService || employee.employee_service_name === this.selectedService) &&
      (!this.selectedLocation || employee.employee_location === this.selectedLocation)
    );
  }

  viewServiceDetails(employee: any) {
    this.router.navigate(['/emp-detail-screen'], {
      queryParams: {
        employee_id: employee.employee_id,
        emp_aadhar_number: employee.emp_aadhar_number,
        employee_name: employee.employee_name,
        employee_service_name: employee.employee_service_name,
        employee_image: employee.employee_image,
        employee_phoneno: employee.employee_phoneno,
        employee_email: employee.employee_email,
        employee_desc: employee.employee_desc,
        employee_rating: employee.employee_rating,
        employee_location: employee.employee_location,
        employee_experience: employee.employee_experience,
        employee_service_fee: employee.employee_service_fee
      }
    });
  }
}
