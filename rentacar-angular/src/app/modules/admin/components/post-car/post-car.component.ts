import { Component } from '@angular/core';
import { NgZorroModule } from '../../../../NgZorroModule';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-post-car',
  standalone: true,
  imports: [NgZorroModule, NgIf, ReactiveFormsModule, NgFor],
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.scss'
})
export class PostCarComponent {

  postCarForm!: FormGroup;
  isSpinning = false;
  selectedFile!: File;
  imagePreview: string | ArrayBuffer | null = null;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfBrands = ["BMW","MERCEDES-BENZ", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD", "NISSAN", "HYUNDAI", "LEXUS", "KIA"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  constructor(private fb: FormBuilder, 
    private adminService: AdminService,
    private router: Router,
  private notification: NzNotificationService)  {
    this.postCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      transmission: [null, Validators.required],
      color: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
    });
  }

  postCar() {
    console.log(this.postCarForm.value);
    const formData: FormData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('name', this.postCarForm.value.name);
    formData.append('brand', this.postCarForm.value.brand);
    formData.append('type', this.postCarForm.value.type);
    formData.append('transmission', this.postCarForm.value.transmission);
    formData.append('color', this.postCarForm.value.color);
    formData.append('price', this.postCarForm.value.price);
    formData.append('description', this.postCarForm.value.description);
    formData.append('year', this.postCarForm.value.year);
    // console.log(formData);
    this.adminService.postCar(formData).subscribe((res) => {
      console.log(res);
      this.notification.success('Success', 'Car posted successfully', {nzDuration: 5000});
      this.router.navigate(['/admin/dashboard']);
    }, (error) => {
      console.log(error);
      this.notification.error('Error', 'Error while posting car', {nzDuration: 5000});
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
}
