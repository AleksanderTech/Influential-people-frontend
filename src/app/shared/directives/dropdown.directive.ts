import { Directive, ElementRef, Output, EventEmitter, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[clickOutside]',
})
export class ClickOutsideDirective {

    @Input() targetElementId: string;
    @Output() public clickOutside = new EventEmitter();

    constructor(private elementRef: ElementRef) {
    }

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement) {
        if (targetElement.id !== this.targetElementId) {

            this.clickOutside.emit(null);
        }
    }
}