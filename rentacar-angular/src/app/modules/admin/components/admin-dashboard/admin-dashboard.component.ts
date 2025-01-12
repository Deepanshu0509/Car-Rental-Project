import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  cars: any = [];

  constructor(private adminService: AdminService) { 
    this.getAllCars();
  }

  getAllCars() {
    this.adminService.getAllCars().subscribe((res) => {
      console.log(res);
      res.forEach((element: any) => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
        this.cars.push(element);
      });
      console.log(res);
    });
  }

}
