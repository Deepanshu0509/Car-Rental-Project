import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NgZorroModule } from '../../../../NgZorroModule';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-bookings',
  standalone: true,
  imports: [NgZorroModule, CommonModule],
  templateUrl: './get-bookings.component.html',
  styleUrl: './get-bookings.component.scss'
})
export class GetBookingsComponent {

    isSpinning : boolean = false;
    bookedCars: any;
  
    constructor(private adminService: AdminService) {
      this.getBookings();
     }
  
    getBookings(){
      this.isSpinning = true;
      this.adminService.getBookings().subscribe((res) => {
        this.isSpinning = false;
        console.log(res);
        this.bookedCars = res;
      })
    }

}
