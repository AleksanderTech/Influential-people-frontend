import { ModalMediator } from '../other/modal-mediator';

export class DeleteMediator extends ModalMediator<any> {

    message: string;
    isDeleted: boolean;

    constructor(message?: string, display?: boolean, entityId?: any) {
        super(display, entityId);
        this.message = message;
    }
}
