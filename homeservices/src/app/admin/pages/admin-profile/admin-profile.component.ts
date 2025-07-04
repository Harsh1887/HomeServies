import { Component, OnInit } from '@angular/core';
import { Admin } from '../../../basic/models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']  // ✅ Corrected from 'styleUrl' to 'styleUrls'
})
export class AdminProfileComponent implements OnInit {
  admin: Admin | null = null;

  ngOnInit(): void {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      this.admin = JSON.parse(storedAdmin);
    }
  }
}
