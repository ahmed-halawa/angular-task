import { Directive, HostBinding, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[border]'
})
export class BorderDirective {
  @Input() borderColor;

  @HostBinding('style.borderColor') get getBorderColor() {
    return this.borderColor;
  }
}
