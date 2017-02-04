import {Directive, ElementRef, Renderer, Input, OnChanges, SimpleChange, OnDestroy} from '@angular/core';
import {Config} from 'ionic-angular';
import {CustomIconBase} from './custom-icon-base'
import {ElementRefClassUpdater} from './util/ElementRefClassUpdater';

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

  constructor(private _elementRef: ElementRef,
              private _renderer: Renderer,
              config: Config) {
    super(config);
    this.classUpdater = new ElementRefClassUpdater(_elementRef, _renderer);
  }

  /**
   * Called on input parameter value changes.
   */
  public ngOnChanges(changes: {[key: string]: SimpleChange}) {
    super.update(this.iconName, this.iconSet);
  }

  /**
   * Lifecycle hook when the directive is destroyed.
   */
  public ngOnDestroy() {
    super.removeElementClasses();
  }

}
