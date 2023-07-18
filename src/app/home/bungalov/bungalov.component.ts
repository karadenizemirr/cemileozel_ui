import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/customService/alertify.service';
import { ApiService } from 'src/app/customService/api.service';
import { SessionService } from 'src/app/customService/session.service';

@Component({
  selector: 'app-bungalov',
  templateUrl: './bungalov.component.html',
  styleUrls: ['./bungalov.component.css']
})
export class BungalovComponent implements OnInit{
  
  constructor(
    private apiService: ApiService,
    private alertifyService: AlertifyService,
    private sessionService: SessionService,
    private route: ActivatedRoute
  ){}

  public house:any

  ngOnInit(): void {

    try{

      // Get House Data
      this.route.params.subscribe(async(params) => {
        const id = params['id']
        this.house = await this.apiService.getHouseDataWithId(id)
      })

    }catch(err){
      this.alertifyService.warning('Sayfa yüklenirken bir sorun meydana geldi.')
    }

  }

}
