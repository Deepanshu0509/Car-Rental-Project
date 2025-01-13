import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-car',
  standalone: true,
  imports: [],
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.scss'
})
export class UpdateCarComponent {

  carId: number = this.activatedRoute.snapshot.params['id'];

  constructor(private service: AdminService,
    private activatedRoute: ActivatedRoute
  ) {
    this.getCarById();
   }

  getCarById() {
    this.service.getCarById(this.carId).subscribe((res) => {
      console.log(res);
    })
  }

}
