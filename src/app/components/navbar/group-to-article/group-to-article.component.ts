import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token/token.service';
import { GroupToArticleService } from 'src/app/services/group-to-article/group-to-article.service';
import { GroupToArticle } from 'src/app/models/groupToArticle';
@Component({
  selector: 'app-group-to-article',
  templateUrl: './group-to-article.component.html',
  styleUrls: ['./group-to-article.component.scss']
})
export class GroupToArticleComponent implements OnInit {

  constructor(private tokenService: TokenService, private groupToArticleService: GroupToArticleService) { }

  selectedFiles: File;
  selectedFile: File;
  selectedFileName: string = 'Выберите файл';

  ngOnInit(): void {
  }
  selectFile(event: any): void {
    this.selectedFileName = '';
    this.selectedFiles = event.target.files;
    this.selectedFileName = this.selectedFiles[0].name;
    this.selectedFile = this.selectedFiles[0];
    console.log(this.selectedFile);
  }

  upload() {
    console.log("qweqwe")
    this.groupToArticleService.loadFile(new GroupToArticle(this.tokenService.getToken(), this.selectedFile)).subscribe({
      next: response => {
        if (response)
          console.log(response)
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
