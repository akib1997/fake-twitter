import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatProgressSpinner, MatSpinner } from '@angular/material/progress-spinner';
import { SpinnerComponent } from '@shared/components/spinner/spinner.component';
import { Subject, map, scan } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay) {}

  show() {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'overlay-backdrop',
        positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
      });
    }

    this.overlayRef.attach(new ComponentPortal(SpinnerComponent));
  }

  hide() {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
  }
}
