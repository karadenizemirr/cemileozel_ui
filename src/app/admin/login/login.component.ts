import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/customService/alertify.service';
import { ApiService } from 'src/app/customService/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  constructor(
    private formBuilder: FormBuilder,
    private alertify: AlertifyService,
    private apiService: ApiService
  ){}

  loginForm!: FormGroup
  loginData:any
  
  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      username:["",Validators.required],
      password:["", Validators.required]
    })
  }

  getLogin(){
    try{

      if(this.loginForm.valid){
        this.loginData = Object.assign({}, this.loginForm.value)

        // Get Login
        this.apiService.userAuth(this.loginData.username, this.loginData.password)
        this.loginForm.reset()
      }

    }catch(err){
      this.alertify.danger('Giriş yapılırken bir sorun meydana geldi.')
    }
  }
}
