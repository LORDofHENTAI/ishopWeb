import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { OrderComponent } from './components/order-manager/order/order.component';
import { OrdersFormComponent } from './components/order-manager/orders-form/orders-form.component';
import { OrdersReadyBuildComponent } from './components/order-manager/order-types/orders-ready-build/orders-ready-build.component';
import { OrdersArchiveComponent } from './components/order-manager/order-types/orders-archive/orders-archive.component';
import { OrdersUncompletedComponent } from './components/order-manager/order-types/orders-uncompleted/orders-uncompleted.component';
import { OrdersReadyShipmentComponent } from './components/order-manager/order-types/orders-ready-shipment/orders-ready-shipment.component';
import { OrderCanceledComponent } from './components/order-manager/order-types/order-canceled/order-canceled.component';
import { EmptyFormComponent } from './components/empty-form/empty-form.component';
import { OrderCompletedComponent } from './components/order-manager/order-types/order-completed/order-completed.component';
import { OrderReturnToRetailComponent } from './components/order-manager/order-types/order-return-to-retail/order-return-to-retail.component';
import { OrderHistoryFormComponent } from './components/order-manager/order-history-form/order-history-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/orders/ready-build', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'order/:id', component: OrderComponent, data: { id: '1', barcodes: '' } },
  { path: 'orders/ready-build', component: OrdersReadyBuildComponent },
  // { path: 'orders/in-assembly', component: OrdersReadyBuildComponent },
  { path: 'orders/uncompleted', component: OrdersUncompletedComponent },
  { path: 'orders/ready-shipment', component: OrdersReadyShipmentComponent },
  { path: 'orders/return-to-retail', component: OrderReturnToRetailComponent },
  { path: 'orders/canceled', component: OrderCanceledComponent },
  { path: 'orders/archive', component: OrdersArchiveComponent },
  { path: 'orders/archive', component: OrdersArchiveComponent },
  { path: 'orders', component: OrdersFormComponent },
  { path: 'orders/completed', component: OrderCompletedComponent },
  { path: 'orders/statushistory', component: OrderHistoryFormComponent },
  { path: 'empty', component: EmptyFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
