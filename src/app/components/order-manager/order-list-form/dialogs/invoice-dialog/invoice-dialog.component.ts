import { Component, OnInit, Inject, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SafeUrlPipe } from 'src/app/pipes/safeUrl.pipe';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { OrderListAnsw } from 'src/app/models/order-models/order-list-answ';
import { ManagerModel } from 'src/app/models/invoice-models/managerModel';
import { DataInvoiceService } from 'src/app/services/data-invoice/data-invoice.service';
import { TokenService } from 'src/app/services/token/token.service';
@Component({
  selector: 'app-invoice-dialog',
  templateUrl: './invoice-dialog.component.html',
  styleUrls: ['./invoice-dialog.component.scss'],
})
export class InvoiceDialogComponent implements OnInit {

  daysCount = ['1 (один)', '3 (три)', '5 (пять)', '10 (десять)'];
  // manager = ['менеджер__________________Иванов/', 'менеджер__________________Петров/'];
  selectedDaysCount: string;
  selectedManager: any;
  selectedDate = new Date()
  nowFormatted: string;
  url!: string;
  showIFrame: boolean = false;

  ManagerList: ManagerModel[]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataInvoiseService: DataInvoiceService,
    private tokenService: TokenService

  ) {
    this.nowFormatted = formatDate(this.selectedDate, 'dd.MM.yyyy', 'en-US');
  }
  @Input() dialogType: number = this.data.dialogType;
  @Input() order: OrderListAnsw = this.data.element
  ngOnInit(): void {
    this.getManager()
  }

  getManager() {
    this.dataInvoiseService.getManagers(this.tokenService.getToken()).subscribe(
      {
        next: result => {
          if (result)
            this.ManagerList = result
        },
        error: error => {
          console.log(error)
        }
      })
  }


  showInvoice() {
    const sendManager = `${this.selectedManager.job_title}________________/${this.selectedManager.fio}/`
    const invoiceNum = `СЧ29.${this.order.order.num}.${this.order.order.name}`;
    this.showIFrame = true;
    console.log(this.order)
    if (this.order.order.delivery_type === '')
      this.url = `${environment.apiUrl}/api/FastReport/ShowReportWithoutDelivery?Id=${this.order.order.sub_num}&EndTime=${this.selectedDaysCount}&Manager=${sendManager}&Date=${this.nowFormatted}&NameDocument=${invoiceNum}&DaysForBank=${this.selectedDaysCount}`
    else
      this.url = `${environment.apiUrl}/api/FastReport/ShowReportInvoice?Id=${this.order.order.sub_num}&EndTime=${this.selectedDaysCount}&Manager=${sendManager}&Date=${this.nowFormatted}&NameDocument=${invoiceNum}&DaysForBank=${this.selectedDaysCount}`

  }


  // showDogovor() {
  //   this.url = `${environment.apiUrl}/api/FastReport/ShowReportInvoice?Id=${this.order.order.sub_num}&EndTime=${this.selectedDaysCount}&Manager=${this.selectedManager}&Date=${this.nowFormatted}`
  // }
  // showDogoworBelpost() {
  //   this.url = `${environment.apiUrl}/api/FastReport/ShowReportInvoice?Id=${this.order.order.sub_num}&EndTime=${this.selectedDaysCount}&Manager=${this.selectedManager}&Date=${this.nowFormatted}`
  // }

}
