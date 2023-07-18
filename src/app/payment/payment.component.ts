import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../customService/api.service';
import { AlertifyService } from '../customService/alertify.service';
import { SessionService } from '../customService/session.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit{
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private alertify: AlertifyService,
    private sessionService: SessionService
    ){}

    paymentForm!: FormGroup
  
  price: number= 0
  paymentData: any
  result: any




  // Form Operations
  createPaymentForm(){
    this.paymentForm = this.formBuilder.group({
      cardNumber:["",Validators.required],
      nameSurname:["",Validators.required],
      price:["",Validators.required],
      expDate:["",Validators.required],
      ccv:["",Validators.required]
    })
  }

  async ngOnInit(){
   
    // Get Result Data
    this.createPaymentForm()
    const resultData = await history.state.resultData

    const endDate:any = new Date(resultData.formData.endDate)
    const startDate:any = new Date(resultData.formData.startDate)

    const dateCalculate = this.countWeekdatWeekendDays(startDate, endDate)
    
    // Get Price
    const houseData = await this.apiService.getHouseDataWithId(resultData.formData.house)
    const weekdayPrice = houseData.data.houseProperty.weekdayPrice
    const weekendPrice = houseData.data.houseProperty.weekendPrice 

    const calculate = (Number(dateCalculate.weekday) * Number(weekendPrice)) + (Number(dateCalculate.weekend) * Number(weekdayPrice))
    this.price = calculate
  }

  async addPayment(){
    try{
      if (this.paymentForm.valid){
        // Database Save
        this.paymentData = Object.assign({},this.paymentForm.value)
        const resultData = await history.state.resultData
  
        
        const savePaymentData = {
          "cardNumber": this.paymentData.cardNumber,
          "name": this.paymentData.nameSurname.split(" ")[0],
          "surname": this.paymentData.nameSurname.split(" ")[1],
          "month": this.paymentData.expDate.split("/")[0],
          "year": this.paymentData.expDate.split('/')[1],
          "ccv": this.paymentData.ccv
        }
  
        const saveData = {
          payment: savePaymentData,
          appoinment: resultData,
          totalPrice: this.price
        }
        const response = await this.apiService.addAppointment(saveData)
        // Save Session
        this.sessionService.setSettionData("appoinmentId", response.data.id)
  
        this.alertify.success('Güvenli Ödeme Sayfasına Yönlendiriliyorsunuz')
        this.router.navigate(['/cardsecure'],{state: {payment: saveData}})
      }else{
        this.alertify.danger('Eksik bilgiler tespit edildi.')
      }
    }catch(err){
      this.alertify.danger('Bir sorun meydana geldi.')
    }
  }


  countWeekdatWeekendDays(startDate:any, endDate:any): any{
    try{

      const start:any = new Date(startDate);
      const end:any = new Date(endDate);
    
      let weekdayCount = 0;
      let weekendCount = 0;
    
      const dayDifference = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    
      for (let i = 0; i <= dayDifference; i++) {
        const currentDate = new Date(start.getTime() + (i * (1000 * 60 * 60 * 24)));
        const day = currentDate.getDay();
    
        if (day === 0 || day === 6) {
          weekendCount++;
        } else {
          weekdayCount++;
        }
      }
    
      return { weekday: weekdayCount, weekend: weekendCount };

    }catch(err){
      console.log('Day calculate error')
    }
  }
}
