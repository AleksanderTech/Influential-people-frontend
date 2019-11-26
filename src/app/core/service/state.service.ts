import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  behaviorSubject = new BehaviorSubject<any>('');
  currentHttpResponse = this.behaviorSubject.asObservable();

  constructor() { }

  change(httpResponse: any) {
    this.behaviorSubject.next(httpResponse);
  }

}
