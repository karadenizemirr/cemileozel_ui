import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/customService/alertify.service';
import { ApiService } from 'src/app/customService/api.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit{

  constructor(
    private apiService: ApiService,
    private router: Router,
    private alertify: AlertifyService
  ){}


  ngOnInit(): void {
    
  }

  logout(){
    try{
      this.apiService.logout()
      this.alertify.success('Çıkış işlemi başarılı')

    }catch(err){

      this.alertify.danger('Çıkış işlemi başarısız oldu.')
    }
  }

}
