import {Directive, ElementRef, Renderer, Input, OnChanges, SimpleChange, OnDestroy} from '@angular/core';
import {Config} from 'ionic-angular';

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
export class CustomIcon implements OnChanges, OnDestroy {

  /**
   * CSS class prefix
   */
  private static readonly CSS_PREFIX = 'custom-icons-';

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
   * Current active css class
   */
  private _class: string;
  /**
   * Current active css class with mode suffix
   */
  private _classMode: string;
  /**
   * Platform mode: md, ios or wp
   */
  private _mode: string;

  constructor(private _elementRef: ElementRef,
              private _renderer: Renderer,
              config: Config) {
    this._setMode(config.get('mode'));
  }

  /**
   * Called on input parameter value changes.
   */
  public ngOnChanges(changes: {[key: string]: SimpleChange}) {
    this._update();
  }

  /**
   * Set platform mode.
   * @param mode md, ios or wp
   * @private
   */
  private _setMode(mode: string) {
    if (['md', 'ios', 'wp'].indexOf(mode) === -1) {
      throw 'CustomIcon: Mode ' + this._mode + ' not supported';
    }
    this._mode = mode;
  }

  /**
   * Update and set element's css class values.
   * @private
   */
  private _update() {
    // remove old css class values
    this.removeElementClasses();

    if (!this.iconName || !this.iconSet) {
      // invalid input parameters
      this._class = this._classMode = undefined;
      return;
    }

    // new css class values
    this._class = CustomIcon.CSS_PREFIX + this.iconSet + '-' + this.iconName;
    this._classMode = this._class + '-' + this._mode;
    this._renderer.setElementClass(this._elementRef.nativeElement, this._class, true);
    this._renderer.setElementClass(this._elementRef.nativeElement, this._classMode, true);
  }

  /**
   * Lifecycle hook when the directive is destroyed.
   */
  public ngOnDestroy() {
    this.removeElementClasses();
  }

  /**
   * Remove all CSS class values from this element set by the directive.
   * @private
   */
  private removeElementClasses() {
    if (this._class)
      this._renderer.setElementClass(this._elementRef.nativeElement, this._class, false);
    if (this._classMode)
      this._renderer.setElementClass(this._elementRef.nativeElement, this._classMode, false);
  }

}
