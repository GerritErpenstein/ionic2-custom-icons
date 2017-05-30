import {Directive, ElementRef, Renderer, Input, OnChanges, SimpleChange, OnDestroy} from '@angular/core';
import {Config} from 'ionic-angular';
import {CustomIconBase} from '../custom-icon-base';
import {ElementRefClassUpdater} from '../util/ElementRefClassUpdater';
import {isTrueValue} from '../util/utils';

/**
 * Directive to display custom icons from generated icon font.
 *
 * Example usage:
 * @usage
 * ```html
 * <custom-icon set="mySet" name="myIcon"></custom-icon>
 * ```
 *
 * @author Gerrit Erpenstein
 */
@Directive({
  selector: 'custom-icon',
  host: {
    'role': 'img'
  }
})
export class CustomIcon extends CustomIconBase implements OnChanges, OnDestroy {

  /**
   * Icon name
   */
  @Input('name')
  public iconName: string = '';
  /**
   * Icon set name
   */
  @Input('set')
  public iconSet: string = '';

  /**
   * Icon in active state?
   */
  private _isActive: boolean = true;

  @Input('isActive')
  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(isActive: boolean) {
    this._isActive = isTrueValue(isActive);
  }

  constructor(private _elementRef: ElementRef,
              private _renderer: Renderer,
              config: Config) {
    super(config);
    this.classUpdater = new ElementRefClassUpdater(_elementRef, _renderer);
  }

  /**
   * Called on input parameter value changes.
   */
  public ngOnChanges(changes: { [key: string]: SimpleChange }) {
    if (changes.hasOwnProperty('iconName')) {
      super.updateIcon(this.iconName);
    }
    if (changes.hasOwnProperty('iconSet')) {
      super.updateSet(this.iconSet);
    }
    if (changes.hasOwnProperty('isActive')) {
      super.updateActive(this.isActive);
    }
  }

  /**
   * Lifecycle hook when the directive is destroyed.
   */
  public ngOnDestroy() {
    super.removeElementClasses();
  }

}
