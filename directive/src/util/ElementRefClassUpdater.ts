import {ElementRef, Renderer} from '@angular/core';
import {ClassUpdater} from './ClassUpdater';

/**
 * ClassUpdater implementation for ElementRef type.
 *
 * @author Gerrit Erpenstein
 */
export class ElementRefClassUpdater implements ClassUpdater {

  constructor(private _elementRef: ElementRef,
              private _renderer: Renderer) {
  }

  addClass(clazz: string): void {
    this._renderer.setElementClass(this._elementRef.nativeElement, clazz, true);
  }

  removeClass(clazz: string): void {
    this._renderer.setElementClass(this._elementRef.nativeElement, clazz, false);
  }
}
