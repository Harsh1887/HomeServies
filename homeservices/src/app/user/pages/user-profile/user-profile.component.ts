import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../basic/services/auth/auth.service';
import { Router } from '@angular/router';
import { UserStorageService } from '../../../basic/services/storage/user-storage.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../basic/models/user.model'; // ✅ Import actual model

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  currentUser: User | null = null;
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private userStorageService: UserStorageService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadUser();

    if (this.currentUser) {
      console.log('User loaded:', this.currentUser);
    } else {
      this.error = 'User not authenticated.';
      console.error(this.error);
    }
  }

  async loadUser(): Promise<void> {
    return new Promise((resolve) => {
      const user = this.userStorageService.getUser();

      if (user) {
        this.currentUser = user;
        resolve();
      } else {
        console.warn('User not found. Retrying...');
        setTimeout(() => {
          this.currentUser = this.userStorageService.getUser();
          if (!this.currentUser) {
            this.error = 'User could not be loaded.';
          }
          resolve();
        }, 500);
      }
    });
  }
}
