//ElementRef injects into the directive's constructor so the code can access the DOM element.
//Directive provides the functionality of the @Directive decorator.
import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({ selector: '[myHighlight]' })

export class HighlightDirective {
    @Input('myHighlight') highlightColor: string;

    constructor(private el: ElementRef) {
        el.nativeElement.style.backgroundColor = 'yellow';
    }

    @HostListener('mouseenter') onmouseenter() {
        this.highlight(this.highlightColor || 'red');
    }

    @HostListener('mouseleave') onmouseleave() {
        this.highlight(null);
    }

    private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }

}