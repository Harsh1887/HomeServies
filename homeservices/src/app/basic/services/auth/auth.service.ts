import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';
import { UserStorageService } from '../storage/user-storage.service';
import { Admin, Emp, User } from '../../models/user.model';
import { AdminStorageService } from '../storage/admin-storage.service';
import { EmpStorageService } from '../storage/emp-storage.service';
// import { ChangeDetectorRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost/api_homeservices'; // Replace with your actual PHP API URL
  private currentUser: any = null;
  private userStorage!: UserStorageService;
  private currentAdmin: any = null;
  private adminStorage!: AdminStorageService;
  private currentEmp: any = null;
  private empStorage!: EmpStorageService;

  constructor(private http: HttpClient, private injector: Injector) { }

  //USER++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  private getUserStorage(): any {
    if (!this.userStorage) {
      this.userStorage = this.injector.get(UserStorageService); // Inject manually
    }
    return this.userStorage;
  }

  setUser(user: any): void {
    this.currentUser = user;
    this.getUserStorage().setUser(user); // Use manual injection jal
  }

  getUser(): any {
    return this.getUserStorage().getUser();
  }

  isUserLoggedIn(): boolean {
    const user = this.getUser();  // Get the user from UserStorageService
    return user !== null;  // If the user exists, they are logged in
  }

  clearUser(): void {
    console.log('Before logout, user:', this.getUser()); // Debugging
    this.currentUser = null;
    localStorage.removeItem('user');
    console.log('After logout, user:', this.getUser()); // Debugging
  }

  // User Login
  user_login(user_email: string, user_password: string): Observable<any> {
    const url = `${this.apiUrl}/user/user_login.php`;
    const body = { user_email, user_password };

    return this.http.post<any>(url, body).pipe(
      tap(response => {
        if (response.success) {
          const user: User = {
            id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            address: response.user.address,
            phone: response.user.phone
          };
          this.setUser(user); // Store user properly
          console.log('User logged in and set:', this.getUser()); // Debugging
        }
        //  else {
        //   console.error('Login failed:', response.message);
        // }
      })
    );
  }

  // User Signup
  user_signup(user_name: string, user_email: string, user_phoneno: number, user_address: string, user_password: string): Observable<any> {
    const url = `${this.apiUrl}/user/register.php`;
    const body = { user_name, user_email, user_phoneno, user_address, user_password };
    return this.http.post(url, body);
  }
  // Validate Email
  validate_email(user_email: string): Observable<any> {
    const url = `${this.apiUrl}/user/validate_email.php`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, { user_email }, { headers });
  }

  logout(): void {
    this.clearUser();
  }

  getCurrentUser(): User | null {
    return this.userStorage.getUser();
  }


  //ADMIN+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  private getAdminStorage(): any {
    if (!this.adminStorage) {
      this.adminStorage = this.injector.get(AdminStorageService); // Inject manually
    }
    return this.adminStorage;
  }

  setAdmin(admin: any): void {
    this.currentAdmin = admin;
    this.getAdminStorage().setAdmin(admin); // Use manual injection
  }

  getAdmin(): any {
    return this.getAdminStorage().getAdmin();
  }

  isAdminLoggedIn(): boolean {
    const admin = this.getAdmin();  // Get the user from UserStorageService
    return admin !== null;  // If the user exists, they are logged in
  }

  clearAdmin(): void {
    console.log('Before logout, admin:', this.getAdmin()); // Debugging
    this.currentAdmin = null;
    localStorage.removeItem('admin');
    console.log('After logout, admin:', this.getAdmin()); // Debugging
  }

  admin_login(admin_email: string, admin_password: string): Observable<any> {
    const url = `${this.apiUrl}/admin/login_admin.php`;
    const body = { admin_email, admin_password };

    return this.http.post<any>(url, body).pipe(
      tap(response => {
        if (response.success) {
          const admin: Admin = {
            id: response.admin.id,
            name: response.admin.name,
            email: response.admin.email
          };
          this.setAdmin(admin); // Store user properly
          console.log('Admin logged in and set:', this.getAdmin()); // Debugging
        }
        //  else {
        //   console.error('Login failed:', response.message);
        // }
      })
    );
  }

  logoutAdmin(): void {
    this.clearAdmin();
  }

  getCurrentAdmin(): Admin | null {
    return this.adminStorage.getAdmin();
  }




  //EMP+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  registerEmployee(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/employee/register_emp.php`, data);
  }

  updateEmployee(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/employee/update_emp.php`, data);
  }


  private getEmpStorage(): any {
    if (!this.empStorage) {
      this.empStorage = this.injector.get(EmpStorageService); // Inject manually
    }
    return this.empStorage;
  }

  setEmp(emp: any): void {
    this.currentEmp = emp;
    this.getEmpStorage().setEmp(emp); // Use manual injection jal
  }

  getEmp(): any {
    return this.getEmpStorage().getEmp();
  }

  isEmpLoggedIn(): boolean {
    const emp = this.getEmp();  // Get the user from UserStorageService
    return emp !== null;  // If the user exists, they are logged in
  }

  clearEmp(): void {
    console.log('Before logout, user:', this.getEmp()); // Debugging
    this.currentEmp = null;
    localStorage.removeItem('emp');
    console.log('After logout, user:', this.getEmp()); // Debugging
  }

  // User Login
  emp_login(employee_email: string, employee_password: string): Observable<any> {
    const url = `${this.apiUrl}/employee/login_emp.php`;
    const body = { employee_email, employee_password };

    return this.http.post<any>(url, body).pipe(
      tap(response => {
        if (response.success) {
          const emp: Emp = {
            employee_id: response.emp.employee_id,
            emp_aadhar_number: response.emp.emp_aadhar_number,
            employee_name: response.emp.employee_name,
            employee_service_name: response.emp.employee_service_name,
            employee_image: response.emp.employee_image,
            employee_phoneno: response.emp.employee_phoneno,
            employee_email: response.emp.employee_email,
            employee_desc: response.emp.employee_desc,
            employee_rating: response.emp.employee_rating,
            employee_location: response.emp.employee_location,
            employee_experience: response.emp.employee_experience,
            employee_service_fee: response.emp.employee_service_fee
          };
          this.setEmp(emp); // Store user properly
          console.log('Emp logged in and set:', this.getEmp()); // Debugging
        }
        //  else {
        //   console.error('Login failed:', response.message);
        // }
      })
    );
  }

  logoutEmp(): void {
    this.clearEmp();
  }

  getCurrentEmp(): User | null {
    return this.userStorage.getUser();
  }


  



  //ADMIN PANEL++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>( `${this.apiUrl}/user/all_users.php`);
  }

  getAllEmp(): Observable<Emp[]> {
    return this.http.get<Emp[]>( `${this.apiUrl}/employee/all_emp.php`);
  }


deleteEmployee(employee_id: number): Observable<any> {
  const url = `${this.apiUrl}/admin/delete_emp.php`;
  const body = { employee_id };
  console.log(body);
  return this.http.post(url, body);
}


}
