import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentComponent } from './payment/payment.component';
import { CardsecureComponent } from './cardsecure/cardsecure.component';
import { ApiService } from './customService/api.service';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { ProcessComponent } from './admin/process/process.component';
import { AlertifyService } from './customService/alertify.service';
import { LoginComponent } from './admin/login/login.component';
import { AdminHouseComponent } from './admin/admin-house/admin-house.component';
import { environment } from 'src/environment.prod';
import { BungalovComponent } from './home/bungalov/bungalov.component';
import { VillaComponent } from './home/villa/villa.component';
import { HousesComponent } from './home/houses/houses.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReservationComponent,
    NavbarComponent,
    PaymentComponent,
    CardsecureComponent,
    AdminHomeComponent,
    AdminNavbarComponent,
    ProcessComponent,
    LoginComponent,
    AdminHouseComponent,
    BungalovComponent,
    VillaComponent,
    HousesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ApiService, AlertifyService,{provide: 'imgUrl', useValue: environment.imgUrl}],
  bootstrap: [AppComponent]
})
export class AppModule { }
