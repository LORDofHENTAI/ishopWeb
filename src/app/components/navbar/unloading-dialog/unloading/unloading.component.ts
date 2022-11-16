import { Component, OnInit } from '@angular/core';
import { FullLoad } from 'src/app/models/full-load';
import { FullLoadService } from 'src/app/services/full-load/full-load.service';
import { TokenService } from 'src/app/services/token/token.service';
@Component({
  selector: 'app-unloading',
  templateUrl: './unloading.component.html',
  styleUrls: ['./unloading.component.scss']
})
export class UnloadingComponent implements OnInit {

  constructor(private fullLoadService: FullLoadService, private tokenService: TokenService) { }

  ngOnInit(): void {

  }
  fullLoad() {
    this.fullLoadService.fullIshopLoad(new FullLoad(this.tokenService.getToken())).subscribe({
      next: response => {
        console.log(response)
      },
      error: error => {
        console.log(error)
      }
    })
  }
  fullLoadPrice() {
    console.log('asd')
    this.fullLoadService.priceLoad(new FullLoad(this.tokenService.getToken())).subscribe({
      next: response => {
        console.log(response)
      },
      error: error => {
        console.log(error)
      }
    })
  }
  fullLoadStocks() {
    this.fullLoadService.stockLoad(new FullLoad(this.tokenService.getToken())).subscribe({
      next: response => {
        console.log(response)
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
