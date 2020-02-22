import { ModalMediator } from './modal-mediator';

export interface Manageable<T> {

    createEntity(): void;
    deleteEntity(entity: T): void;
    changeEntity(entity:T): void;
    onEntityChange(modalMediator:ModalMediator<T>):void;
    onEntityCreate(modalMediator:ModalMediator<T>):void
}