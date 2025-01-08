import { Component } from '@angular/core';
import { NgZorroModule } from '../../../NgZorroModule';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgZorroModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isSpinning : boolean = false;
  loginform!: FormGroup;

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.loginform = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  login(){
    console.log(this.loginform.value); 
    this.authService.login(this.loginform.value).subscribe((res) => {
      console.log(res);
      if(res.userId != null){
        const user = {
          id: res.userId,
          role: res.userRole
        }
        this.storageService.saveToken(res.jwt);
        this.storageService.saveUser(user);
        if(this.storageService.isAdminLoggedIn()){
          this.router.navigateByUrl('/admin/dashboard');
        }
        else{
          this.router.navigateByUrl('/customer/dashboard');
        }
      }else {
        this.message.error('Invalid Credentials', { nzDuration: 5000 });
      }
    }); 
  }


}
