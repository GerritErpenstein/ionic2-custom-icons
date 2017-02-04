import {ElementRef, Renderer} from '@angular/core';
import {Config} from 'ionic-angular';
import {ClassUpdater} from './util/ClassUpdater';

/**
 * Base class for custom-icon directives. Mainly responsible for setting/updating the target element's CSS class.
 *
 * @author Gerrit Erpenstein
 */
export abstract class CustomIconBase {

  /**
   * CSS class prefix
   */
  private static readonly CSS_PREFIX = 'custom-icons-';

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

  /**
   * CSS class updater instance
   */
  private _classUpdater: ClassUpdater;

  constructor(config: Config) {
    this.mode = config.get('mode');
  }

  /**
   * Set platform mode.
   * @param mode md, ios or wp
   * @private
   */
  protected set mode(mode: string) {
    if (['md', 'ios', 'wp'].indexOf(mode) === -1) {
      throw 'CustomIcon: Mode ' + this._mode + ' not supported';
    }
    this._mode = mode;
  }

  /**
   * TODO
   * @param classUpdater
   */
  protected set classUpdater(classUpdater: ClassUpdater) {
    this._classUpdater = classUpdater;
  }

  /**
   * Update and set element's css class values.
   * @private
   */
  protected update(iconName: string, iconSet: string) {
    // remove old css class values
    this.removeElementClasses();

    if (!iconName || !iconSet) {
      // invalid input parameters
      this._class = this._classMode = undefined;
      return;
    }

    // new css class values
    this._class = CustomIconBase.CSS_PREFIX + iconSet + '-' + iconName;
    this._classMode = this._class + '-' + this._mode;
    this._classUpdater.addClass(this._class);
    this._classUpdater.addClass(this._classMode);
  }

  /**
   * Remove all CSS class values from this element set by the directive.
   * @private
   */
  protected removeElementClasses() {
    if (this._class)
      this._classUpdater.removeClass(this._class);
    if (this._classMode)
      this._classUpdater.removeClass(this._classMode);
  }

}
