import { Component } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgZorroModule } from '../../../../NgZorroModule';
import { StorageService } from '../../../../auth/services/storage/storage.service';

@Component({
  selector: 'app-book-car',
  standalone: true,
  imports: [NgIf, CommonModule, NgZorroModule, ReactiveFormsModule],
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.scss'
})
export class BookCarComponent {

      car: any ;
      carId: number = this.activated.snapshot.params["id"];
      bookACarForm!: FormGroup;
      isSpinning: boolean = false;
      dateFormat = 'yyyy-MM-dd';

      constructor(private customerService: CustomerService,
        private message: NzMessageService,
        private activated: ActivatedRoute,
        private fb: FormBuilder,
        private storageService: StorageService
      ) { 
        this.bookACarForm = this.fb.group({
          fromDate: [null, Validators.required],
          toDate: [null, Validators.required]
        })
        this.getCarById();
      }
    
      getCarById() {
        this.customerService.getCarById(this.carId).subscribe((res) => {
          console.log(res);
          res.processedImg = 'data:image/jpeg;base64,' + res.returnedImage;
          this.car = res;
        });
      }

      bookCar(formData: any){
        this.isSpinning = true;
        let obj = {
          fromDate: formData.fromDate,
          toDate: formData.toDate,
          userId: this.storageService.getUserId()
        }

        this.customerService.bookACar(this.carId, obj).subscribe((res) => {
          this.isSpinning = false;
          this.message.success('Car booked successfully', { nzDuration: 5000 });
        }, error => {
          this.message.error('Car booking failed', { nzDuration: 5000 });
        })

      }

}
