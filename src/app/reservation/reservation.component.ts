import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../customService/api.service';
import { AlertifyService } from '../customService/alertify.service';
import { environment } from 'src/environment.prod';
import { SessionService } from '../customService/session.service';
import { bornDateValidator, dateValidator, emailValidator, phoneNumberValidator, stringValidator } from '../validation/customValidaton';

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
    private sessionService: SessionService

    ) {}

  reservationAddForm!: FormGroup;
  private reservation:any;
  houseData:any
  selectHouseData:any
  imgUrl = environment.apiUrl
  itemSelectId:any
  
  createReservationAddForm(){
    this.reservationAddForm = this.formBuilder.group({
      // Validation
      name:["",Validators.required,stringValidator()],
      surname:["",Validators.required, stringValidator()],
      identifier:["",Validators.required],
      bornDate: ["",Validators.required,bornDateValidator()],
      phoneNumber: ["",Validators.required,phoneNumberValidator()],
      email: ["",Validators.required,emailValidator()],
      startDate: ["",Validators.required,dateValidator()],
      endDate: ["",Validators.required,dateValidator()],
      country: ["",Validators.required,stringValidator()],
      city: ["",Validators.required,stringValidator()],
      district: ["",Validators.required,stringValidator()],
      house: ["",Validators.required]
    })
  }

  async ngOnInit() {
    this.apiServices.isLoggedIn()
    this.createReservationAddForm()
    this.houseData = await this.apiServices.getHouseData()
    // Item Select
    this.itemSelectId = this.sessionService.getSettionData('houseId')?? 1
    if (this.itemSelectId){
      this.selectHouseData = await this.apiServices.getHouseDataWithId(this.itemSelectId)
    }
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

      
      
    }else{
      
      console.log(this.reservationAddForm.get('name'))
      
      
    }
  }

  async onChangeDropdown(event: any) {
    const selectedValue = event.target.value;
    if (selectedValue !== null && selectedValue !== undefined) {
      this.selectHouseData = await this.apiServices.getHouseDataWithId(selectedValue)
    }
  }
}