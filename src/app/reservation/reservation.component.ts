import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../customService/api.service';
import { AlertifyService } from '../customService/alertify.service';
import { environment } from 'src/environment.prod';
import { CustomCookieService } from '../customService/cookie.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private apiServices: ApiService,
    private alertifyjs: AlertifyService,
    private cookieService: CustomCookieService
    ) {}

  reservationAddForm!: FormGroup;
  private reservation:any;
  houseData:any
  selectHouseData:any
  imgUrl = environment.apiUrl
  
  createReservationAddForm(){
    this.reservationAddForm = this.formBuilder.group({
      // Validation
      name:["",Validators.required],
      surname:["",Validators.required],
      identifier:["",Validators.required],
      bornDate: ["",Validators.required],
      phoneNumber: [""],
      email: [""],
      startDate: [""],
      endDate: [""],
      country: [""],
      city: [""],
      district: [""],
      house: [""]
    })
  }

  async ngOnInit() {
    this.apiServices.isLoggedIn()
    this.createReservationAddForm()
    this.houseData = this.apiServices.getHouseData().then((data) => {
      this.houseData = data
    })
  }
  
  async addReservation(){
    if (this.reservationAddForm.valid){
      this.reservation = Object.assign({}, this.reservationAddForm.value)
      const myIP = this.apiServices.ipDetect()
      const resultData = {
        formData: this.reservation,
        status: "success",
        payment: true,
        ip : myIP
      }
      this.reservationAddForm.reset()
      this.alertifyjs.success('Kayıt başarılı ödeme sayfasına yönlendiriliyorsunuz.')
      this.router.navigate(['/payment'], {state: {resultData: resultData}})
      // Create Cookie
      this.cookieService.setEncryptedCookie('reservation', JSON.stringify(resultData))
    }else{
      this.alertifyjs.danger('Bir sorun meydana geldi.')
    }
  }

  async onChangeDropdown(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue !== null && selectedValue !== undefined) {
      this.selectHouseData = await this.apiServices.getHouseDataWithId(selectedValue)
    }
  }
}