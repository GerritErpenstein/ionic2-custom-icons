import {ClassUpdater} from './ClassUpdater';

/**
 * ClassUpdater implementation for HTMLElement type.
 *
 * @author Gerrit Erpenstein
 */
export class HTMLElementClassUpdater implements ClassUpdater {

  constructor(private _htmlElement: HTMLElement) {
  }

  addClass(clazz: string): void {
    this._htmlElement.classList.add(clazz);
  }

  removeClass(clazz: string): void {
    this._htmlElement.classList.remove(clazz);
  }
}
