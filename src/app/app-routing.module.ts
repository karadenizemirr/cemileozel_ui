import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { PaymentComponent } from './payment/payment.component';
import { CardsecureComponent } from './cardsecure/cardsecure.component';
import { ProcessComponent } from './admin/process/process.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminHouseComponent } from './admin/admin-house/admin-house.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { canActivateTeam } from './customService/child-acitvate.guard';
import { BungalovComponent } from './home/bungalov/bungalov.component';
import { VillaComponent } from './home/villa/villa.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rezervasyon', component: ReservationComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'cardsecure', component: CardsecureComponent },
  {path: 'bungalov/:id', component: BungalovComponent},
  {path: 'villa/:id', component: VillaComponent},
  
  {
    path: 'admin',
    canActivateChild: [canActivateTeam],
    children: [
      {path:"", component: AdminHomeComponent},
      { path: 'process/:id', component: ProcessComponent },
      { path: 'house', component: AdminHouseComponent}
    ]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
