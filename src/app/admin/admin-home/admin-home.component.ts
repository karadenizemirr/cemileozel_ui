import { Component, OnChanges, OnInit, SimpleChange } from '@angular/core';
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

  
  async ngOnInit() {
    // Get All Payment
    this.fetchAppoinmentData();
  }
  
  async fetchAppoinmentData(): Promise<void> {
    this.appoinment = await this.apiService.getAllAppoinment();
  }

  async someMethod(): Promise<void> {
    this.fetchAppoinmentData();
  }

}
