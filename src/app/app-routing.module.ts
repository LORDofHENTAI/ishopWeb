import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/orders/ready-build', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  // { path: 'order/:id', component: OrderComponent, data: { id: '1', barcodes: '' } },
  // { path: 'orders/ready-build', component: OrdersReadyBuildComponent },
  // // { path: 'orders/in-assembly', component: OrdersReadyBuildComponent },
  // { path: 'orders/uncompleted', component: OrdersUncompletedComponent },
  // { path: 'orders/ready-shipment', component: OrdersReadyShipmentComponent },
  // { path: 'orders/canceled', component: OrdersCanceledComponent },
  // { path: 'orders/archive', component: OrdersArchiveComponent },
  // { path: 'orders', component: OrdersFormComponent },
  // { path: 'empty', component: EmptyFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
