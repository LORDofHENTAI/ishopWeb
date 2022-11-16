import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef, Input, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderBodyReq } from 'src/app/models/order-models/order-body-req';
import { OrderBodyAnsw } from 'src/app/models/order-models/order-body-answ';
import { OrderService } from 'src/app/services/order-service/order.service';
import { TokenService } from 'src/app/services/token/token.service';
import { ClientInfo } from 'src/app/models/order-models/client-info';
import { OrderBody } from 'src/app/models/order-models/order-body';
import { Title } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BelPostAnsw } from 'src/app/models/order-models/bel-post-answ';
import { BelPostReq } from 'src/app/models/order-models/bel-post-req';
import { BarcodeInputCountFormComponent } from '../dialog-windows/barcode-input-count-form/barcode-input-count-form.component';
import { timer } from 'rxjs';
import { Changer } from 'src/app/models/order-models/changer';
import { SnakebarService } from 'src/app/services/snakebar/snakebar.service';
import { DelPostRequest } from 'src/app/models/order-models/del-post-request';
import { element } from 'protractor';
import { FindOrderReq } from 'src/app/models/order-models/find-order-req';
import { OrderListAnsw } from 'src/app/models/order-models/order-list-answ';

export interface BelpostData {
  barcode: string,
  username: string,
  address: string,
  num: string,
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {
  @Input() data: string;
  @ViewChild('barcodePrint', { static: true }) barcodePrint: any;

  displayedColumns = ['Артикул', ' ', 'Штрихкод', 'Наименование', 'Требуемое количество', 'Собранное количество'];
  displayedColumnsPrint = ['article', 'barcode', 'name', 'count', 'countReady', 'vatz', 'cost'];
  dataSource: Array<OrderBody> = [new OrderBody('', '', '', '', '0', '0', '0', false, '', '', '')];
  client: ClientInfo = new ClientInfo('', '', '');
  orderId = '';
  isDataChanged = false;
  belpostBarcodes: Array<string> = [];
  param = ';';
  imgSource = 'https://barcode.tec-it.com/barcode.ashx?data=';
  selectedBarcode = '';
  selectedBarcodeFor = '';
  cancelClicked = false;
  confirmClicked = false;
  belpostData: BelpostData;
  userName = '';
  orderListAnsw: Array<OrderListAnsw> = [];


  orderBodyAnsw: OrderBodyAnsw = new OrderBodyAnsw('', '', '', false, '', new ClientInfo('', '', ''), [new OrderBody('', '', '', '', '0', '0', '0', false, '', '', '')], []);
  countReadyСhange: number;
  belPostAnsw: BelPostAnsw = null;
  splitElement = ';';

  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  /* FRUIT */
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = [' 01Bepx', ' 01Hu3', ' 02Bepx', ' 03Bepx', ' 04Bepx', ' 05Hu3', ' colona1', ' D03Bepx', ' Poddon', ' Telezka', 'A0', 'A00', 'A001', 'A002', 'A003', 'A004', 'A005', 'A006', 'A008', 'A009', 'A010', 'A029', 'A030', 'A031', 'A032', 'A033', 'A034', 'B001'];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  /* */
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private titleService: Title,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private tokenService: TokenService,
    private snackbarService: SnakebarService,
  ) {
    this.orderId = route.snapshot.params['id'];

    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
  }


  /* */
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    this.fruitInput.nativeElement.value = "";
    this.fruitCtrl.setValue(null);
    this.isDataChanged = true;
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
    this.isDataChanged = true;
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    this.isDataChanged = true;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
  /**/

  ngOnInit(): void {
    this.titleService.setTitle(this.titleService.getTitle() + ' №' + this.orderId);
    let orderBodyReq = new OrderBodyReq(this.tokenService.getToken(), this.orderId)
    this.orderService.getSuborder(orderBodyReq).subscribe({
      next: response => {
        if (response) {
          this.getData(response);

        }
      },
      error: error => {
        console.log(error);
      }
    });
    this.userName = this.tokenService.getLogin();
  }

  selectBarcode(barcode: any) {
    this.selectedBarcode = barcode;
    console.log(this.selectedBarcode);
  }

  unSelectBarcode() {
    this.selectedBarcode = '';
    console.log('------');
  }

  // onClickIcon(barcode) {
  //   this.selectedBarcodeFor = barcode;
  // }

  onCancel() {
    this.selectedBarcodeFor = '';
    this.belpostData = null;
  }

  orderStatus: string;
  getData(response: OrderBodyAnsw) {
    this.orderBodyAnsw = response;
    this.fruits = response.place;
    this.client = this.orderBodyAnsw.aboutClient;
    this.dataSource = this.orderBodyAnsw.body;
    this.getBelpostBarcodes(this.orderBodyAnsw.postCode);
    this.orderService.orderSearch(new FindOrderReq(this.tokenService.getToken(), this.orderBodyAnsw.num, this.orderBodyAnsw.name)).subscribe({
      next: response => {
        if (response)
          this.orderStatus = response[0].status;
      },
      error: error => {
        console.log(error);
      }
    });
    console.log(this.orderBodyAnsw);
  }

  getBelpostBarcodes(value: string) {
    if (value)
      this.belpostBarcodes = value.split(this.param).filter(i => i);
    else
      this.belpostBarcodes = [];
  }

  onInputNewCount(event: string, element: OrderBody): void {
    if (event.length >= 0) {
      element.count_g = event;
      element.changed = true;
      this.isDataChanged = this.checkDataChanged();
      if (+element.count_g > +element.count_e)
        element.count_g = element.count_e;
      if (!element.count_g)
        element.count_g = '0';
    }
  }

  onFocusout(element) {
    if (+element.count_g > +element.count_e)
      element.count_g = element.count_e;
    if (!element.count_g)
      element.count_g = '0';
  }

  onClearCount(element: OrderBody): void {
    element.count_gСhange = element.count_g;
    element.changed = false;
    this.isDataChanged = this.checkDataChanged();
  }

  onSaveChanges(): void {
    // this.dataSource.map(element => {
    //   if(element.count_gСhange)
    //     element.count_g = element.count_gСhange ? element.count_gСhange.toString() : '0';
    //   delete element.count_gСhange;
    //   delete element.changed;
    // });

    this.dataSource.map(element => {
      if (Number(element.count_g) > Number(element.count_e))
        element.count_g = element.count_e;
      delete element.count_gСhange;
      delete element.changed;
    });

    this.orderBodyAnsw.place = this.fruits;


    if (!this.orderBodyAnsw.belPost || (this.orderBodyAnsw.belPost && this.belpostBarcodes.length > 0)) {
      let order = new Changer(this.tokenService.getToken(), this.orderBodyAnsw);
      this.orderService.orderSaveChange(order).subscribe({
        next: response => {
          if (response = 'true') {
            this.snackbarService.openSnackBar('Количество изменено', this.action);
            this.getData(this.orderBodyAnsw);
          }
          if (response = 'false') {
            this.snackbarService.openSnackBar('Перезагрузите страницу', this.action);
          }
        },
        error: error => {
          console.log(error);
          this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
        }
      });
    }
    else
      this.snackbarService.openSnackBar('Добавьте штрихкод', this.action, this.styleNoConnect);
  }

  checkDataChanged(): boolean {
    let result = this.dataSource.filter(d => d.changed === true);
    return result.length > 0
  }

  openStoragePrintBarcodeDialog() {
    const dialogRef = this.dialog.open(BarcodeInputCountFormComponent, {
      width: "300px",
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result >= 1 && result <= 4) {
        let belPostReq = new BelPostReq(this.tokenService.getToken(), this.orderBodyAnsw.sub_num, result)
        this.orderService.getBarcode(belPostReq).subscribe({
          next: response => {
            if (response) {
              this.belPostAnsw = response;
              let t = timer(0, 100).subscribe(vl => {
                if (vl >= 10) {
                  // this.barcodePrint._elementRef.nativeElement.click();
                  t.unsubscribe();
                  let orderBodyReq = new OrderBodyReq(this.tokenService.getToken(), this.orderId)
                  this.orderService.getSuborder(orderBodyReq).subscribe({
                    next: response => {
                      if (response) {
                        console.log('barcode added')
                        this.getData(response);
                      }
                    },
                    error: error => {
                      console.log(error);
                    }
                  });
                }
              });
            }
          },
          error: error => {
            console.log(error);
          }
        });
      }
    });
  }


  onPrintBelpost(code: string) {
    this.belpostData = { barcode: code, username: this.orderBodyAnsw.aboutClient.fIO, address: this.orderBodyAnsw.aboutClient.adress, num: this.orderBodyAnsw.num }
    // const dialogRef = this.dialog.open(PrintBelpostBarcodeComponent, {
    //   width: "60%",
    //   data: { barcode: code, username: 'KKK', address: 'asdasfas', num: this.orderBodyAnsw.num },
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if(result) {

    //   }
    // });
  }

  endOrder() {
    this.snackbarService.openSnackBar('coming soon', this.action);
  }

  openDeleteDialog(barcode: any, sub_num: any): void {
    const deleteDialog = this.dialog.open(BelpostDelete, {
      data: { barcode: barcode, sub_num: sub_num }
    });
    deleteDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.snackbarService.openSnackBar('Штрихкод Белпочты удален', this.action);
        let orderBodyReq = new OrderBodyReq(this.tokenService.getToken(), this.orderId)
        this.orderService.getSuborder(orderBodyReq).subscribe({
          next: response => {
            if (response) {
              this.getData(response);
            }
          },
          error: error => {
            console.log(error);
          }
        });
      }
      else
        if (result === false) {
          this.snackbarService.openSnackBar('Операция не выполнена', this.action, this.styleNoConnect);
        }

    });
  }

  openCompliteDialog(): void {
    const compliteDialog = this.dialog.open(orderCompleteDialog, {
      data: { orderBodyAnsw: this.orderBodyAnsw }
    });
    compliteDialog.afterClosed().subscribe(result => {
      console.log(result);
      if (result === 'Complete')
        this.snackbarService.openSnackBar('Заказ завершен', this.action);
    });
  }
}



@Component({
  selector: 'belpost-delete-dialog.html',
  templateUrl: 'order-dialog/belpost-delete-dialog.html',
})

export class BelpostDelete {

  constructor(
    private tokenService: TokenService,
    private orderService: OrderService,
    private orderComponent: OrderComponent,
    public dialogRef: MatDialogRef<OrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }
  @Input() barcode: string = this.data.barcode;
  @Input() sub_num: string = this.data.sub_num;
  belpostData: BelpostData;
  belPostAnsw: BelPostAnsw = null;
  action = 'Ok';
  selectedBarcodeFor = '';
  orderId = '';

  onDelete() {
    this.selectedBarcodeFor = '';
    this.belpostData = null;
    let delPostRequest = new DelPostRequest(this.tokenService.getToken(), this.sub_num, this.barcode);
    this.orderService.orderDeleteBelpostBarcode(delPostRequest).subscribe({
      next: response => {
        console.log(response);
        if (response = 'true') {
          this.dialogRef.close(true);
        }

      },
      error: error => {
        console.log(error);
        this.dialogRef.close(false);
      }
    });
  }

}

@Component({
  selector: 'order-complete-dialog',
  templateUrl: 'order-dialog/order-complete-dialog.html',
})

export class orderCompleteDialog {

  constructor(
    private dialogRef: MatDialogRef<OrderComponent>,
    private orderService: OrderService,
    private tokenService: TokenService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

  }
  onColickCompleteOrder() {
    let findOrderReq = new FindOrderReq(this.tokenService.getToken(), this.data.num, '');
    this.orderService.orderCompliteOrder(findOrderReq).subscribe({
      next: response => {
        if (response) {
          this.dialogRef.close('Complete');
        }
      },
      error: error => {
        console.log(error);
        this.dialogRef.close(false);
      }
    });
  }
}