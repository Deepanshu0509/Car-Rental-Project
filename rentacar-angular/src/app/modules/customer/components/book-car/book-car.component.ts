import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-book-car',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.scss'
})
export class BookCarComponent {

      car: any ;
      carId: number = this.activated.snapshot.params["id"];
    
      constructor(private customerService: CustomerService,
        private message: NzMessageService,
        private activated: ActivatedRoute
      ) { 
        this.getCarById();
      }
    
      getCarById() {
        this.customerService.getCarById(this.carId).subscribe((res) => {
          console.log(res);
          res.processedImg = 'data:image/jpeg;base64,' + res.returnedImage;
          this.car = res;
        });
      }

}
