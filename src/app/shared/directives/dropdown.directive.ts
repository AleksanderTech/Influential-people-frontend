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
        const isClickedInside = this.elementRef.nativeElement.contains(targetElement);
        if (targetElement.id !== this.targetElementId) {
            console.log('emiting');

            this.clickOutside.emit(null);
        }
    }
}