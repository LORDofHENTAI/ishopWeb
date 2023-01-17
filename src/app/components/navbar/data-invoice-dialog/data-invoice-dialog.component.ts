import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { DirectorModel } from 'src/app/models/invoice-models/directormodel';
import { ManagerModel } from 'src/app/models/invoice-models/managerModel';
import { RequestModel } from 'src/app/models/invoice-models/requestmodel';
import { DataInvoiceService } from 'src/app/services/data-invoice/data-invoice.service';
import { TokenService } from 'src/app/services/token/token.service';
@Component({
  selector: 'app-data-invoice-dialog',
  templateUrl: './data-invoice-dialog.component.html',
  styleUrls: ['./data-invoice-dialog.component.scss']
})
export class DataInvoiceDialogComponent implements OnInit {

  displayedColumns: string[] = ['ФИО', 'Должность', 'Действие'];
  displayedColumns1: string[] = ['ФИО', 'Место хранения', 'Доверенность', 'Действие'];
  constructor(private dataInvoiceService: DataInvoiceService, private tokenService: TokenService) {
  }
  managerList: Array<ManagerModel> = [new ManagerModel(0, '', '')]
  directorsList: Array<DirectorModel> = [new DirectorModel(0, '', 0, '')]
  manager_fio: string;
  job_title: string
  editable: boolean = false

  director_fio: string
  storelock: number
  dover: string

  updateId: number;
  ngOnInit(): void {
  }

  selectConteiner: number = 1

  switchConteiner(element) {
    switch (element) {
      case 2:
        this.selectConteiner = element;
        this.getMangers();
        break;
      case 3:
        this.selectConteiner = element;
        this.getDirectors();
        break;
      default:
        this.selectConteiner = 1;
        break;
    }
  }
  switchEditable(fio, job, id) {
    this.editable = !this.editable
    this.manager_fio = fio
    this.job_title = job
    this.updateId = id
  }
  switchEditableDir(fio, store, dover, id) {
    this.editable = !this.editable
    this.director_fio = fio
    this.storelock = store
    this.dover = dover
    this.updateId = id
  }

  getMangers() {
    this.dataInvoiceService.getManagers(this.tokenService.getToken()).subscribe({
      next: result => {
        if (result)
          this.managerList = result
        console.log(this.managerList)
      },
      error: error => {
        console.log(error);
      }
    })
  }
  createMangers() {
    const createManager = new ManagerModel(0, this.manager_fio, this.job_title)
    this.dataInvoiceService.createManagers(createManager).subscribe({
      next: result => {
        if (result = 'true')
          this.getMangers()
        this.manager_fio = ''
        this.job_title = ''
      },
      error: error => {
        console.log(error);
      }
    })
  }
  updateManagers() {
    const updateManager = new ManagerModel(this.updateId, this.manager_fio, this.job_title)
    this.dataInvoiceService.updateManagers(updateManager).subscribe({
      next: result => {
        console.log(result)
        if (result = 'true')
          this.getMangers();
        this.editable = !this.editable
        this.manager_fio = ''
        this.job_title = ''
      },
      error: error => {
        console.log(error)
      }
    })
  }

  deleteManagers(element) {
    const deleteManager = new RequestModel(this.tokenService.getToken(), element)
    this.dataInvoiceService.deleteManagers(deleteManager).subscribe({
      next: result => {
        if (result = 'true')
          this.getMangers()
      },
      error: error => {
        console.log(error)
      }
    })
  }

  getDirectors() {
    this.dataInvoiceService.getDirectors(this.tokenService.getToken()).subscribe({
      next: result => {
        if (result)
          this.directorsList = result
      },
      error: error => {
        console.log(error)
      }
    })
  }

  createDirectors() {
    const createDirector = new DirectorModel(0, this.director_fio, this.storelock, this.dover)
    this.dataInvoiceService.createDirectors(createDirector).subscribe({
      next: result => {
        if (result = 'true')
          this.getDirectors()
        this.director_fio = ''
        this.storelock = null
        this.dover = ''
      },
      error: error => {
        console.log(error)
      }
    })
  }

  updateDirectors() {
    const updateDirector = new DirectorModel(this.updateId, this.director_fio, this.storelock, this.dover)
    this.dataInvoiceService.updateDirectors(updateDirector).subscribe({
      next: result => {
        if (result = 'true')
          this.getDirectors()
        this.editable = !this.editable
        this.director_fio = ''
        this.storelock = null
        this.dover = ''
      },
      error: error => {
        console.log(error)
      }
    })
  }

  deleteDirectors(element) {
    const deleteDirector = new RequestModel(this.tokenService.getToken(), element)
    this.dataInvoiceService.deleteDirectors(deleteDirector).subscribe({
      next: result => {
        if (result = 'true')
          this.getDirectors()
      },
      error: error => {
        console.log(error)
      }
    })
  }

}
