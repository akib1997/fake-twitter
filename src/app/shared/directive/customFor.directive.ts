import {
  Directive,
  DoCheck,
  EmbeddedViewRef,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';

@Directive({
  selector: '[appCustomFor]',
  standalone: true
})
export class CustomForDirective<T> implements DoCheck {
  private vcr = inject(ViewContainerRef);

  // same input as ngFor, we just need it to check if list is empty
  @Input() ngForOf?: T[] = undefined;

  // reference of the empty template to display
  @Input() ngForEmpty!: TemplateRef<unknown>;

  // reference of the embeddedView of our empty template
  private ref?: EmbeddedViewRef<unknown>;

  // use ngDoChange if you are never mutating data in your app
  ngDoCheck(): void {
    this.ref?.destroy();

    if (!this.ngForOf || this.ngForOf.length === 0) {
      this.ref = this.vcr.createEmbeddedView(this.ngForEmpty);
    }
  }
}
