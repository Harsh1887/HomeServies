import { Component, OnInit } from '@angular/core';
import { EmpStorageService } from '../../../basic/services/storage/emp-storage.service';
import { Emp } from '../../../basic/models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-emp-profile',
  standalone: true,
    imports: [CommonModule],
  templateUrl: './emp-profile.component.html',
  styleUrls: ['./emp-profile.component.scss']
})
export class EmpProfileComponent implements OnInit {
  empData: Emp | null = null;

  constructor(private empStorageService: EmpStorageService) {}

  ngOnInit(): void {
    this.empData = this.empStorageService.getEmp();
  }
}
