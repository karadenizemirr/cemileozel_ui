import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservationComponent } from './reservation/reservation.component';
import { PaymentComponent } from './payment/payment.component';
import { CardsecureComponent } from './cardsecure/cardsecure.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'rezervasyon', component: ReservationComponent},
  {path: "payment", component: PaymentComponent},
  {path: "cardsecure", component: CardsecureComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
