import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from '../customService/api.service';
import { environment } from 'src/environment.prod';
import { AlertifyService } from '../customService/alertify.service';
import { SessionService } from '../customService/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  constructor(
    private apiService: ApiService, 
    private alertifyService: AlertifyService, 
    private sessionSerivce: SessionService,
    private router: Router
    
    ) {}
  houseData:any
  imageUrl:any

  async ngOnInit() {
    this.houseData =await this.apiService.getAllHouse()
    this.imageUrl = environment.apiUrl
  }

  async reservationButtonClick(id:any, type:string){
    try{
      // Delete Session
      const sessionControl = this.sessionSerivce.getSettionData("houseId")
      if(sessionControl){
        this.sessionSerivce.removeSession("houseId")
      }

       // Create House Session
       this.sessionSerivce.setSettionData("houseId", id.toString())
       this.router.navigate(['rezervasyon'])

    }catch(err){
      this.alertifyService.warning('Bir sorun meydana geldi.')
    }
  }
}
