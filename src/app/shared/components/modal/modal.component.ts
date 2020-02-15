import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Modal, ModalType } from '../../model/modal';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input('modal') modal: Modal;
  @Output('modalSubmitted') modalSubmit: EventEmitter<Modal> = new EventEmitter<Modal>();
  readonly INFO: ModalType = ModalType.INFO;
  readonly WARN: ModalType = ModalType.WARN;

  constructor() { }

  submit() {
    this.modal.showModal = false;
    this.modal.isSubmitted=true;
    this.modalSubmit.emit(this.modal);
  }

  close() {
    this.modal.showModal = false;
    this.modal.isSubmitted=false;
  }
}
