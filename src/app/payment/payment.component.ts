import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../customService/api.service';
import { AlertifyService } from '../customService/alertify.service';
import { CustomCookieService } from '../customService/cookie.service';

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
    private cookieService: CustomCookieService
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
    // Get Price
    const houseData = await this.apiService.getHouseDataWithId(resultData.formData.house)
    const housePrice = houseData.data.price

    const differenceInMs = Math.abs(endDate.getTime() - startDate.getTime());
    const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
    this.price = parseInt(housePrice) * differenceInDays
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
        await this.apiService.addAppointment(saveData)
  
        this.alertify.success('Güvenli Ödeme Sayfasına Yönlendiriliyorsunuz')
        this.router.navigate(['/cardsecure'],{state: {payment: saveData}})
        // Create Cookie
        this.cookieService.setEncryptedCookie('payment', JSON.stringify(saveData))
      }else{
        this.alertify.danger('Eksik bilgiler tespit edildi.')
      }
    }catch(err){
      this.alertify.danger('Bir sorun meydana geldi.')
    }
  }
}
