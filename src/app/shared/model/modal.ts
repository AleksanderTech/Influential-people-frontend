export class Modal {

    modalType: ModalType;
    message: string;
    showModal: boolean;
    isSubmitted:boolean;
    
    constructor(modalType?: ModalType,message?: string,showModal?: boolean,isSubmitted?:boolean) {
        this.modalType=modalType;
        this.message=message;
        this.showModal=showModal;
        this.isSubmitted=isSubmitted;
     }
}

export enum ModalType {
    INFO,
    WARN
}