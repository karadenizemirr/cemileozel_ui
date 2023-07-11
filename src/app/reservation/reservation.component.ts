import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../customService/api.service';
import { identifyValidator } from '../validation/customValidaton';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  

  constructor(private formBuilder: FormBuilder, private router: Router, private apiServices: ApiService) {}

  reservationAddForm!: FormGroup;
  private reservation:any;
  houseData:any

  
  createReservationAddForm(){
    this.reservationAddForm = this.formBuilder.group({
      // Validation
      name:["",Validators.required],
      surname:["",Validators.required],
      identify:["",Validators.required],
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
    this.createReservationAddForm()
    this.houseData = this.apiServices.getHouseData().then((data) => {
      this.houseData = data
    })
  }

  // Add Operation
  addReservation(){
    if (this.reservationAddForm.valid){
      this.reservation = Object.assign({}, this.reservationAddForm.value)

      const resultData = {
        formData: this.reservation,
        status: "success",
        payment: true
      }
      this.reservationAddForm.reset()

      this.router.navigate(['/payment'], {state: {resultData: resultData}})
    }else{
      alert("bir sorun meydana geldi")
    }
  }
}