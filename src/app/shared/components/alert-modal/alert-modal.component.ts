import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertMediator } from '../../model/alert-mediator';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent{

  @Input('alertMediator') alertMediator: AlertMediator;
  @Output('alertSubmitted') alertEvent: EventEmitter<AlertMediator> = new EventEmitter<AlertMediator>();

  constructor() { }

  submit() {
    this.alertMediator.display = false;
    this.alertMediator.isSubmitted = true;
    this.alertEvent.emit(this.alertMediator);
  }

  close() {
    this.alertMediator.display = false;
    this.alertMediator.isSubmitted = false;
  }
}
