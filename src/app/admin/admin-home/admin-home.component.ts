import { Component, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { Subscription, switchMap, timer } from 'rxjs';
import { ApiService } from 'src/app/customService/api.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit{
  constructor(
    private apiService: ApiService
  ){}

  appoinment:any
  subscription!: Subscription

  
  async ngOnInit() {
    // Get All Payment
    this.subscription = timer(0,2000).pipe(
      switchMap(() => this.apiService.getAllAppoinment())
    ).subscribe((data:any) => {
      this.appoinment = data
    })
  }

}
