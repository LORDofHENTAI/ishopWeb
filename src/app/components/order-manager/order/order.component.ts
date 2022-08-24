import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderBodyReq } from 'src/app/models/order-models/order-body-req';
import { OrderBodyAnsw } from 'src/app/models/order-models/order-body-answ';
import { OrderService } from 'src/app/services/order-service/order.service';
import { TokenService } from 'src/app/services/token/token.service';
import { ClientInfo } from 'src/app/models/order-models/client-info';
import { OrderBody } from 'src/app/models/order-models/order-body';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { BelPostAnsw } from 'src/app/models/order-models/bel-post-answ';
import { BelPostReq } from 'src/app/models/order-models/bel-post-req';
import { BarcodeInputCountFormComponent } from '../dialog-windows/barcode-input-count-form/barcode-input-count-form.component';
import { timer } from 'rxjs';
import { Changer } from 'src/app/models/order-models/changer';
import { SnakebarService } from 'src/app/services/snakebar/snakebar.service';
import { DelPostRequest } from 'src/app/models/order-models/del-post-request';
import { element } from 'protractor';

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

  @ViewChild('barcodePrint', { static: true }) barcodePrint: any;

  displayedColumns = ['article', 'barcode', 'name', 'count', 'countReady'];
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

  orderBodyAnsw: OrderBodyAnsw = new OrderBodyAnsw('', '', '', false, '', new ClientInfo('', '', ''), [new OrderBody('', '', '', '', '0', '0', '0', false, '', '', '')], []);
  countReadyСhange: number;
  belPostAnsw: BelPostAnsw | null;
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
    this.orderService.getSuborder(orderBodyReq).subscribe(response => {
      if (response) {
        this.getData(response);
      }
    },
      error => {
        console.log(error);
      });
    console.log();
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

  onDelete(barcode: any) {
    this.selectedBarcodeFor = '';
    this.belpostData = null;
    let delPostRequest = new DelPostRequest(this.tokenService.getToken(), this.orderBodyAnsw.sub_num, barcode);
    this.orderService.orderDeleteBelpostBarcode(delPostRequest).subscribe(response => {
      if (response.status === 'true') {
        this.snackbarService.openSnackBar('Штрихкод Белпочты удален', this.action,);
        let orderBodyReq = new OrderBodyReq(this.tokenService.getToken(), this.orderId)
        this.orderService.getSuborder(orderBodyReq).subscribe(response => {
          if (response) {
            this.getData(response);
          }
        },
          error => {
            console.log(error);
          });
      }
      else this.snackbarService.openSnackBar('Операция не выполнена', this.action, this.styleNoConnect);
    },
      error => {
        console.log(error);
        this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      });
  }

  getData(response: OrderBodyAnsw) {
    this.orderBodyAnsw = response;
    this.fruits = response.place;
    this.client = this.orderBodyAnsw.aboutClient;
    this.dataSource = this.orderBodyAnsw.body;
    this.getBelpostBarcodes(this.orderBodyAnsw.postCode);
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

    let order = new Changer(this.tokenService.getToken(), this.orderBodyAnsw);

    this.orderService.orderSaveChange(order).subscribe({
      next: response => {
        if (response.status === 'Complate') {
          this.snackbarService.openSnackBar('Количество изменено', this.action);

        }
        if (response.status === 'fail') {
          this.snackbarService.openSnackBar('Перезагрузите страницу', this.action);
        }
      },
      error: error => {
        console.log(error);
        this.snackbarService.openSnackBar(this.messageNoConnect, this.action, this.styleNoConnect);
      }
    });
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
        this.orderService.getBarcode(belPostReq).subscribe(response => {
          if (response) {
            this.belPostAnsw = response;
            let t = timer(0, 100).subscribe(vl => {
              console.log(vl);
              if (vl >= 10) {
                this.barcodePrint._elementRef.nativeElement.click();
                t.unsubscribe();
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
            });
          }
        },
          error => {
            console.log(error);
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
}
