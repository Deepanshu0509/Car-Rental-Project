import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { BookCarComponent } from './components/book-car/book-car.component';
import { GetBookingsComponent } from './components/get-bookings/get-bookings.component';

const routes: Routes = [
  {path: "dashboard", component: CustomerDashboardComponent},
  {path: "book_car/:id", component: BookCarComponent},
  {path: "bookings", component: GetBookingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
