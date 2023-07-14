import { Component, OnInit } from '@angular/core';
import { ApiService } from './customService/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit{
  title = 'The Bungalov';

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    const myIp = this.apiService.ipDetect()
  }
}
