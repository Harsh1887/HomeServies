import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../basic/services/auth/auth.service';
import { User } from '../../../basic/models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})

export class AllUsersComponent implements OnInit {
  users: User[] = [];  // Array to hold the users
  loading: boolean = false;  // To indicate loading status
  errorMessage: string = '';  // To show error message, if any

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUsers();  // Fetch the users when the component initializes
  }

  getUsers(): void {
    this.loading = true;
    this.authService.getUsers().subscribe(
      (response: any[]) => {  // Use any[] if you're unsure about the structure of the response
        console.log('Fetched Users:', response);  // Log the response to the console

        // Map the response to ensure it fits the User model
        this.users = response.map(item => {
          return {
            id: item.user_id,          // Make sure these properties match your API response
            name: item.user_name,
            email: item.user_email,
            phone: item.user_phoneno,
            address: item.user_address
            // Add any other necessary properties based on your User model
          };
        });

        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load users';  // Show error message
        this.loading = false;
      }
    );
  }
}
