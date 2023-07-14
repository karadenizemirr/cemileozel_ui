import { Component, DoCheck, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageVisibilityService } from '../customService/pageVisibility.service';
import { DataService } from '../customService/data.service';
import { CustomCookieService } from '../customService/cookie.service';
import { ApiService } from '../customService/api.service';
import { Subscription, interval, switchMap, timer } from 'rxjs';
import { AlertifyService } from '../customService/alertify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder
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
    this.appoinmentId = history.state.payment.appoinment.formData.house
    // ID Control //
    const control  = history.state.payment
    

    if (!control){
      this.router.navigate(['rezervasyon'])
    }
    

    this.timer()
    this.getCurrentDateTime();
    this.price = history.state.payment.totalPrice

    // Data
    this.subscription = timer(0,5000).pipe(
      switchMap(() => this.apiService.getByIdAppoinment(this.appoinmentId))
    ).subscribe((data:any) => {
      this.liveAppointmentData = data
      if(this.liveAppointmentData.data.secure.status){
        this.alertify.success('Ödeme başarı ile alındı.')
        this.router.navigate(['rezervasyon'])
      }
    })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
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
        const code = this.liveAppointmentData.data.secure.code
        if(code === formData.code){
          this.apiService.secureUpdate({status: true}, this.appoinmentId)
        }
      }

    }catch(err){
      this.alertify.danger('Güvenlik kodu yanlış.')
    }
  }
  

}