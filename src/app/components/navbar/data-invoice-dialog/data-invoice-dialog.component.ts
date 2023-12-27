import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { DirectorModel } from 'src/app/models/invoice-models/directormodel';
import { ManagerModel } from 'src/app/models/invoice-models/managerModel';
import { RequestModel } from 'src/app/models/invoice-models/requestmodel';
import { DataInvoiceService } from 'src/app/services/data-invoice/data-invoice.service';
import { SnakebarService } from 'src/app/services/snakebar/snakebar.service';
import { TokenService } from 'src/app/services/token/token.service';
@Component({
  selector: 'app-data-invoice-dialog',
  templateUrl: './data-invoice-dialog.component.html',
  styleUrls: ['./data-invoice-dialog.component.scss']
})
export class DataInvoiceDialogComponent implements OnInit {

  displayedColumns: string[] = ['ФИО', 'Должность', 'Действие'];
  displayedColumns1: string[] = ['ФИО', 'Место хранения', 'Доверенность', 'Должность', 'Должность по тексту', 'Действие'];
  constructor(private dataInvoiceService: DataInvoiceService, private tokenService: TokenService, private snackBarService: SnakebarService) {
  }
  messageNoConnect = 'Нет соединения, попробуйте позже.';
  action = 'Ok';
  styleNoConnect = 'red-snackbar';

  managerList: Array<ManagerModel> = [new ManagerModel(0, '', '')]
  directorsList: Array<DirectorModel> = [new DirectorModel(0, '', 0, '')]
  manager_fio: string;
  job_title: string
  editable: boolean = false

  director_fio: string
  storelock: number
  dover: string
  dolj: string
  doc_dolj: string
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
  switchEditableDir(fio, store, dover, id, doc_dolj) {
    this.editable = !this.editable
    this.director_fio = fio
    this.storelock = store
    this.dover = dover
    this.updateId = id
    this.doc_dolj = doc_dolj
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
        switch (result.status) {
          case 'true':
            this.getMangers()
            this.snackBarService.openSnackBar('Менеджер добавлен', this.action);
            break
          case 'null':
            this.snackBarService.openSnackBar('Пустое значение', this.action, this.styleNoConnect);
            break
          case 'error':
            this.snackBarService.openSnackBar('Ошибка', this.action, this.styleNoConnect);
            break
          case 'BadAuth':
            this.snackBarService.openSnackBar('Токен не дейсивителен', this.action, this.styleNoConnect);
            break
        }
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
        switch (result.status) {
          case 'true':
            this.getMangers()
            this.snackBarService.openSnackBar('Менеджер обновлен', this.action);
            break
          case 'null':
            this.snackBarService.openSnackBar('Пустое значение', this.action, this.styleNoConnect);
            break
          case 'error':
            this.snackBarService.openSnackBar('Ошибка', this.action, this.styleNoConnect);
            break
          case 'BadAuth':
            this.snackBarService.openSnackBar('Токен не дейсивителен', this.action, this.styleNoConnect);
            break
        }
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
        switch (result.status) {
          case 'true':
            this.getMangers()
            this.snackBarService.openSnackBar('Менеджер удален', this.action);
            break
          case 'null':
            this.snackBarService.openSnackBar('Пустое значение', this.action, this.styleNoConnect);
            break
          case 'error':
            this.snackBarService.openSnackBar('Ошибка', this.action, this.styleNoConnect);
            break
          case 'BadAuth':
            this.snackBarService.openSnackBar('Токен не дейсивителен', this.action, this.styleNoConnect);
            break
        }
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
    const createDirector = new DirectorModel(0, this.director_fio, this.storelock, this.dover, this.dolj, this.doc_dolj)
    this.dataInvoiceService.createDirectors(createDirector).subscribe({
      next: result => {
        switch (result.status) {
          case 'true':
            this.getDirectors()
            this.snackBarService.openSnackBar('Директор добавлен', this.action);
            break
          case 'null':
            this.snackBarService.openSnackBar('Пустое значение', this.action, this.styleNoConnect);
            break
          case 'error':
            this.snackBarService.openSnackBar('Ошибка', this.action, this.styleNoConnect);
            break
          case 'BadAuth':
            this.snackBarService.openSnackBar('Токен не дейсивителен', this.action, this.styleNoConnect);
            break
        }
        this.director_fio = ''
        this.storelock = null
        this.dover = ''
        this.doc_dolj = ''
      },
      error: error => {
        console.log(error)
      }
    })
  }

  updateDirectors() {
    const updateDirector = new DirectorModel(this.updateId, this.director_fio, this.storelock, this.dover, this.dolj, this.doc_dolj)
    this.dataInvoiceService.updateDirectors(updateDirector).subscribe({
      next: result => {
        switch (result.status) {
          case 'true':
            this.getDirectors()
            this.snackBarService.openSnackBar('Директор обновлен', this.action);
            break
          case 'null':
            this.snackBarService.openSnackBar('Пустое значение', this.action, this.styleNoConnect);
            break
          case 'error':
            this.snackBarService.openSnackBar('Ошибка', this.action, this.styleNoConnect);
            break
          case 'BadAuth':
            this.snackBarService.openSnackBar('Токен не дейсивителен', this.action, this.styleNoConnect);
            break
        }
        this.editable = !this.editable
        this.director_fio = ''
        this.storelock = null
        this.dover = ''
        this.doc_dolj = ''
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
        switch (result.status) {
          case 'true':
            this.getDirectors()
            this.snackBarService.openSnackBar('Директор удален', this.action);
            break
          case 'null':
            this.snackBarService.openSnackBar('Пустое значение', this.action, this.styleNoConnect);
            break
          case 'error':
            this.snackBarService.openSnackBar('Ошибка', this.action, this.styleNoConnect);
            break
          case 'BadAuth':
            this.snackBarService.openSnackBar('Токен не дейсивителен', this.action, this.styleNoConnect);
            break
        }
      },
      error: error => {
        console.log(error)
      }
    })
  }

}
