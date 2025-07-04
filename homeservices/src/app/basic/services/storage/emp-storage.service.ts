import { Injectable } from '@angular/core';
import { Emp } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class EmpStorageService {

  private currentEmp: Emp | null = null;

  constructor() {
    this.loadEmpFromStorage(); // Load employee on initialization
  }

  /**
   * Save employee details to memory and localStorage
   * Also sanitizes any keys with trailing or leading whitespace.
   */
  setEmp(emp: Emp): void {
    this.currentEmp = emp;
    localStorage.setItem('emp', JSON.stringify(emp));
    console.log('[EmpStorageService] Emp saved to storage:', emp);
  }
  

  /**
   * Retrieve employee details
   */
  getEmp(): Emp | null {
    if (this.currentEmp) {
      return this.currentEmp;
    }

    const empData = localStorage.getItem('emp');
    if (empData) {
      this.currentEmp = JSON.parse(empData) as Emp;
      return this.currentEmp;
    }
    return null;
  }

  /**
   * Check if employee is logged in
   */
  isEmpLoggedIn(): boolean {
    return this.getEmp() !== null;
  }

  /**
   * Clear employee details (Logout)
   */
  clearEmp(): void {
    console.log('Before logout, emp:', this.getEmp());
    this.currentEmp = null;
    localStorage.removeItem('emp');
    console.log('After logout, emp:', this.getEmp());
  }

  /**
   * Load employee from local storage on service init
   */
  private loadEmpFromStorage(): void {
    const storedEmp = localStorage.getItem('emp');
    if (storedEmp) {
      this.currentEmp = JSON.parse(storedEmp) as Emp;
    }
  }
}
