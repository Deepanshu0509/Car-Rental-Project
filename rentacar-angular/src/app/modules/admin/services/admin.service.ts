import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';


const BASIC_URL = ['http://localhost:8080/api'];

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,
              private storageService: StorageService
  ) { }

  postCar(carDto: any){
    return this.http.post(`${BASIC_URL}/admin/car`, carDto, {
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
