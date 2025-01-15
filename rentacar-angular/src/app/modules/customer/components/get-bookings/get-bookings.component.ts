import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NgZorroModule } from '../../../../NgZorroModule';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-get-bookings',
  standalone: true,
  imports: [NgZorroModule, NgFor, CommonModule],
  templateUrl: './get-bookings.component.html',
  styleUrl: './get-bookings.component.scss'
})
export class GetBookingsComponent {

  isSpinning : boolean = false;
  bookedCars: any;

  constructor(private customerService: CustomerService) {
    this.getBookings();
   }

  getBookings(){
    this.isSpinning = true;
    this.customerService.getBookingsByUserId().subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      this.bookedCars = res;
    })
  }
}
