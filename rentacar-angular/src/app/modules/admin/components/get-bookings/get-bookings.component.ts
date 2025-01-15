import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { NgZorroModule } from '../../../../NgZorroModule';
import { CommonModule } from '@angular/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { error } from 'console';

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
  
    constructor(private adminService: AdminService,
      private message: NzMessageService) {
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

    changeBookingStatus(bookingId: number, status: string){ 
      this.isSpinning = true;
      this.adminService.changeStatus(bookingId, status).subscribe((res) => {
        console.log(res);
        this.isSpinning = false;
        this.getBookings();
        this.message.success('Booking status changed successfully', { nzDuration: 5000 });
      }, error => {
        this.isSpinning = false;
        this.message.error('Error changing booking status', { nzDuration: 5000 });
      })
    }

}
