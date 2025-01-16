import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from '../../../../NgZorroModule';
import { CommonModule, NgFor } from '@angular/common';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-search-car',
  standalone: true,
  imports: [NgZorroModule, ReactiveFormsModule, NgFor, CommonModule],
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.scss'
})
export class SearchCarComponent {

  isSpinning : boolean = false;
    validateForm!: FormGroup;
    listOfOption: Array<{ label: string; value: string }> = [];
    listOfBrands = ["BMW","MERCEDES-BENZ", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
    listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
    listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
    listOfTransmission = ["Manual", "Automatic"];
    cars: any = [];
  
    constructor(private fb:FormBuilder,
      private customerService: CustomerService
    ) { 
      this.validateForm = this.fb.group({
        brand: [null],
        type: [null],
        color: [null],
        transmission: [null],
      });
    }
  
    searchCar() {
      this.isSpinning = true;
      this.cars = [];
      this.customerService.searchCar(this.validateForm.value).subscribe((res: any) => {
        console.log(res);
        this.isSpinning = false;
        res.carDtoList.forEach((element: any) => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
          this.cars.push(element);
        });
      });
    }

}
