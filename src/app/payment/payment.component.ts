import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../customService/api.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit{
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
    ){}

    paymentForm!: FormGroup
  
  price: number= 0 


  // Form Operations
  createPaymentForm(){
    this.paymentForm = this.formBuilder.group({
      cardNumber:[""],
      nameSurname:[""],
      price:[""],
      expDate:[""],
      ccv:[""]
    })
  }

  async ngOnInit(){
   
    // Get Result Data
    const resultData = await history.state.resultData
    this.createPaymentForm()
  }

  addPayment(){
    if (this.paymentForm.valid){
      this.router.navigate(['/cardsecure'])
    }
  }
}
