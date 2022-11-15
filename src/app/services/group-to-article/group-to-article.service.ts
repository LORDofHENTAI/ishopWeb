import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GroupToArticle } from 'src/app/models/groupToArticle';
import { Observable } from 'rxjs';
import { FileModel } from 'src/app/models/fileModel';

@Injectable({
  providedIn: 'root'
})
export class GroupToArticleService {

  constructor(private http: HttpClient) { }

  groupToArticle = environment.apiUrl + '/article/postexcel/';

  loadFile(data: GroupToArticle): Observable<string> {
    console.log(data);
    let input = new FormData();
    input.append("token", data.token);
    input.append("file", data.file);
    return this.http.post<string>(`${this.groupToArticle}`, input);
  }
}
