import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import { NgFor } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgFor, CommonModule, NzButtonModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

  cars: any = [];

  constructor(private adminService: AdminService,
    private message: NzMessageService
  ) { 
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

  deleteCar(id: number) {
    console.log(id);
    this.cars = [];
    this.adminService.deleteCar(id).subscribe((res) => {
      this.message.success('Car deleted successfully', {nzDuration: 5000});
      this.getAllCars();
    });
  } 

}
