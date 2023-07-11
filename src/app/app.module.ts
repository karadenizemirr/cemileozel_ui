import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertifyService } from './customService/alertify.service';
import { PaymentComponent } from './payment/payment.component';
import { CardsecureComponent } from './cardsecure/cardsecure.component';
import { ApiService } from './customService/api.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReservationComponent,
    NavbarComponent,
    PaymentComponent,
    CardsecureComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AlertifyService,ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
