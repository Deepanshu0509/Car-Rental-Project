import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgZorroModule } from '../../../../NgZorroModule';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-update-car',
  standalone: true,
  imports: [NgZorroModule, NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.scss'
})
export class UpdateCarComponent {

  carId: number = this.activatedRoute.snapshot.params['id'];
  updateForm!: FormGroup;
  existingImage: string | null = null;
  isSpinning = false;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands = ["BMW","MERCEDES-BENZ", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];


  constructor(private service: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.updateForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      transmission: [null, Validators.required],
      color: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      modelYear: [null, Validators.required],
    })
    this.getCarById();
   }

  getCarById() {
    this.service.getCarById(this.carId).subscribe((res) => {
      console.log(res);
      const carDto = res;
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImage;
      this.updateForm.patchValue(carDto);
    })
  }

}
