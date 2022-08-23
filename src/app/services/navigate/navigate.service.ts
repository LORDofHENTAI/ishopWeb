import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  public _subject = new Subject<any>();

  constructor() { }

  statusEvent(event: any) {
    this._subject.next(event);
  }

  get events$() {
    return this._subject.asObservable();
  }
}
