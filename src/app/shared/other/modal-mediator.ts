export class ModalMediator<T> {

    display: boolean;
    isSubmitted: boolean;
    entity: T;

    constructor(display?: boolean, entity?: T) {
        this.display = display;
        this.entity = entity;
    }
}
