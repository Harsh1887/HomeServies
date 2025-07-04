import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  private currentUser: User | null = null;
  // private currentAdmin: Admin | null = null;
  // private currentEmp: Emp | null = null;


  //USER++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  constructor() {
    this.loadUserFromStorage(); // Load user on service initialization
  }

  // Save user details
  setUser(user: User): void {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user)); // Store in local storage
    console.log('User saved:', user);
  }

  // Retrieve user details
  getUser(): User | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    const userData = localStorage.getItem('user');
    if (userData) {
      this.currentUser = JSON.parse(userData) as User;
      return this.currentUser;
    }
    return null;
  }

  // Check if user is logged in
  isUserLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  // Clear user details (Logout)
  clearUser(): void {
    console.log('Before logout, user:', this.getUser()); // Debugging
    this.currentUser = null;
    localStorage.removeItem('user');  // Remove the user from localStorage
    console.log('After logout, user:', this.getUser());  // Debugging to check if it's cleared
  }
  

  // Load user from local storage when service is initialized
  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser) as User;
    }
  }

}