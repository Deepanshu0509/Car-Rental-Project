import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { Observable } from 'rxjs';


const BASIC_URL = ['http://localhost:8080'];

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,
              private storageService: StorageService
  ) { }

  postCar(carDto: any){
    return this.http.post(`${BASIC_URL}/api/admin/car`, carDto, {
      headers: this.createAuthorizationHeader()
    });

  }

  getAllCars() : Observable<any> {
    return this.http.get(`${BASIC_URL}/api/admin/cars`, {
      headers: this.createAuthorizationHeader()
    });
  }

  deleteCar(carId: number) : Observable<any> {
    return this.http.delete(`${BASIC_URL}/api/admin/car/${carId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCarById(carId: number) : Observable<any> {
    return this.http.get(`${BASIC_URL}/api/admin/car/${carId}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  createAuthorizationHeader() {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization', 'Bearer ' + this.storageService.getToken()
    );
  }
    

}
