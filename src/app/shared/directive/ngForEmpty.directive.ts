import { NgFor } from '@angular/common';
import {
  Directive,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
  DoCheck,
} from '@angular/core';

@Directive({
  selector: '[ngForEmpty]',
  standalone: true,
  hostDirectives: [
    // to avoid importing ngFor in component provider array
    {
      directive: NgFor,
      // exposing inputs and remapping them
      inputs: ['ngForOf:ngForEmptyOf'],
    },
  ],
})
class NgForEmptyDirective<T> implements DoCheck {
  private vcr = inject(ViewContainerRef);

  // check if list is undefined or empty
  @Input() ngForEmptyOf: T[] | undefined;

  @Input() ngForEmptyElse!: TemplateRef<any>;

  private ref?: EmbeddedViewRef<unknown>;

  ngDoCheck(): void {
    this.ref?.destroy();

    if (!this.ngForEmptyOf || this.ngForEmptyOf.length === 0) {
      this.ref = this.vcr.createEmbeddedView(this.ngForEmptyElse);
    }
  }
}

export { NgForEmptyDirective as NgForEmpty };
