import { ModalMediator } from '../other/modal-mediator';

export class AlertMediator extends ModalMediator<any> {

    message: string;

    constructor(message?: string, showModal?: boolean, entity?: any) {
        super(showModal, entity);
        this.message = message;
    }
}

