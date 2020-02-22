import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DeleteMediator } from '../../model/delete-mediator';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent{
  
  @Input('deleteMediator') deleteMediator: DeleteMediator;
  @Output('deleteSubmitted') deleteEvent: EventEmitter<DeleteMediator> = new EventEmitter<DeleteMediator>();

  constructor() { }

  submit() {
    this.deleteMediator.display = false;
    this.deleteMediator.isSubmitted = true;
    this.deleteEvent.emit(this.deleteMediator);
  }

  delete() {
    this.deleteMediator.display = false;
    this.deleteMediator.isSubmitted = true;
    this.deleteMediator.isDeleted = true;
    this.deleteEvent.emit(this.deleteMediator);
  }

  close() {
    this.deleteMediator.display = false;
    this.deleteMediator.isSubmitted = false;
  }
}
