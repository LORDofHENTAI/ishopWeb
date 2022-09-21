import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { SmoothScrollModule } from 'ngx-scrollbar/smooth-scroll';
// -----------------------------------------------------------------------------------------
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
// -----------------------------------------------------------------------------------------
import { CompliteDialog } from './components/order-manager/order-list-form/order-list-form.component';
import { DeleteDialog } from './components/order-manager/order-list-form/order-list-form.component';
// -----------------------------------------------------------------------------------------
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavigateFormComponent } from './components/navigate-manager/navigate-form/navigate-form.component';
import { VerticalIconMenuComponent } from './components/navigate-manager/vertical-icon-menu/vertical-icon-menu.component';
import { VerticalMenuComponent } from './components/navigate-manager/vertical-menu/vertical-menu.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SplitPipe } from './pipes/split.pipe';
import { OrdersFormComponent } from './components/order-manager/orders-form/orders-form.component';
import { OrderListFormComponent } from './components/order-manager/order-list-form/order-list-form.component';
import { ConfirmReturnProductComponent } from './components/order-manager/dialog-windows/confirm-return-product/confirm-return-product.component';
import { BarcodeInputCountFormComponent } from './components/order-manager/dialog-windows/barcode-input-count-form/barcode-input-count-form.component';
import { PrintBelpostBarcodeComponent } from './components/order-manager/dialog-windows/print-belpost-barcode/print-belpost-barcode.component';
import { OrderComponent } from './components/order-manager/order/order.component';
import { MatChipsModule } from '@angular/material/chips';
import { BarcodePrintFormComponent } from './components/order-manager/barcode-print-form/barcode-print-form.component';
import { OrdersReadyBuildComponent } from './components/order-manager/order-types/orders-ready-build/orders-ready-build.component';
import { OrdersArchiveComponent } from './components/order-manager/order-types/orders-archive/orders-archive.component';
import { OrderPrintFormComponent } from './components/order-manager/order-print-form/order-print-form.component';
import { OrderCanceledComponent } from './components/order-manager/order-types/order-canceled/order-canceled.component';
import { OrdersInAssemblyComponent } from './components/order-manager/order-types/orders-in-assembly/orders-in-assembly.component';
import { OrdersReadyShipmentComponent } from './components/order-manager/order-types/orders-ready-shipment/orders-ready-shipment.component';
import { OrdersUncompletedComponent } from './components/order-manager/order-types/orders-uncompleted/orders-uncompleted.component';
import { EmptyFormComponent } from './components/empty-form/empty-form.component';
import { ShowDataOrderFormComponent } from './components/order-manager/order-list-form/show-data-order-form/show-data-order-form.component';
import { BelpostDelete } from './components/order-manager/order/order.component';
import { OrderCompletedComponent } from './components/order-manager/order-types/order-completed/order-completed.component';
import { orderCompleteDialog } from './components/order-manager/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavigateFormComponent,
    VerticalIconMenuComponent,
    VerticalMenuComponent,
    LoginPageComponent,
    SplitPipe,
    OrdersFormComponent,
    OrderListFormComponent,
    ConfirmReturnProductComponent,
    BarcodeInputCountFormComponent,
    PrintBelpostBarcodeComponent,
    OrderComponent,
    BarcodePrintFormComponent,
    OrdersReadyBuildComponent,
    OrdersArchiveComponent,
    OrderPrintFormComponent,
    OrderCanceledComponent,
    OrdersInAssemblyComponent,
    OrdersReadyShipmentComponent,
    OrdersUncompletedComponent,
    EmptyFormComponent,
    ShowDataOrderFormComponent,
    CompliteDialog,
    DeleteDialog,
    BelpostDelete,
    OrderCompletedComponent,
    orderCompleteDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatChipsModule,
    NgxPrintModule,
    NgScrollbarModule,
    ReactiveFormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger',
    }),
    MatDialogModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    SmoothScrollModule,
    MatGridListModule,
  ],
  providers: [HttpClient, Title, CookieService, OrderListFormComponent, OrderComponent],
  entryComponents: [
    BarcodeInputCountFormComponent,
    ConfirmReturnProductComponent,
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule { }
