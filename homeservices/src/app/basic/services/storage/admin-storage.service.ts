import { Injectable } from '@angular/core';
import { Admin } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminStorageService {

    private currentAdmin: Admin | null = null;
    
    constructor() {
      this.loadAdminFromStorage(); // Load user on service initialization
    }
  
    // Save user details
    setAdmin(admin: Admin): void {
      this.currentAdmin = admin;
      localStorage.setItem('admin', JSON.stringify(admin)); // Store in local storage
      console.log('Emp saved:', admin);
    }
  
    // Retrieve user details
    getAdmin(): Admin | null {
      if (this.currentAdmin) {
        return this.currentAdmin;
      }
  
      const adminData = localStorage.getItem('admin');
      if (adminData) {
        this.currentAdmin = JSON.parse(adminData) as Admin;
        return this.currentAdmin;
      }
      return null;
    }
  
    // Check if user is logged in
    isAdminLoggedIn(): boolean {
      return this.getAdmin() !== null;
    }
  
    // Clear user details (Logout)
    clearAdmin(): void {
      console.log('Before logout, user:', this.getAdmin()); // Debugging
      this.currentAdmin = null;
      localStorage.removeItem('user');  // Remove the user from localStorage
      console.log('After logout, user:', this.getAdmin());  // Debugging to check if it's cleared
    }
    
  
    // Load user from local storage when service is initialized
    private loadAdminFromStorage(): void {
      const storedAdmin = localStorage.getItem('admin');
      if (storedAdmin) {
        this.currentAdmin = JSON.parse(storedAdmin) as Admin;
      }
    }
  
}
