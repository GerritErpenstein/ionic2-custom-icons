import {Config} from 'ionic-angular';
import {ClassUpdater} from './util/ClassUpdater';

interface CustomIconClasses {
  set: string;
  icon: string;
  mode: string;
  active: string;
}

/**
 * Base class for custom-icon directives. Mainly responsible for setting/updating the target element's CSS class.
 *
 * @author Gerrit Erpenstein
 */
export abstract class CustomIconBase {

  /**
   * CSS set prefix
   */
  private static readonly SET_PREFIX = 'set-';

  /**
   * CSS icon prefix
   */
  private static readonly ICON_PREFIX = 'icon-';

  /**
   * Stores currently set classes
   */
  private _classes: CustomIconClasses = {
    set: null,
    icon: null,
    mode: null,
    active: null
  };

  /**
   * Promise that resolves to the CSS class updater instance
   */
  private _classUpdaterPromise: Promise<ClassUpdater>;
  private _classUpdaterResolve: (classUpdater: ClassUpdater) => void;

  constructor(config: Config) {
    this._classUpdaterPromise = new Promise(resolve => {
      this._classUpdaterResolve = resolve;
    });
    this.updateMode(config.get('mode'));
  }

  /**
   * Set ClassUpdater instance.
   * Note: Setting the ClassUpdater is mandatory!
   * @param classUpdater
   */
  protected set classUpdater(classUpdater: ClassUpdater) {
    this._classUpdaterResolve(classUpdater);
  }

  /**
   * Update icon name.
   * @param icon
   */
  protected updateIcon(icon: string) {
    this._updateClass('icon', CustomIconBase.ICON_PREFIX + icon);
  }

  /**
   * Update set name.
   * @param set
   */
  protected updateSet(set: string) {
    this._updateClass('set', CustomIconBase.SET_PREFIX + set);
  }

  /**
   * Update platform mode.
   * @param mode md, ios or wp
   */
  protected updateMode(mode: string) {
    if (['md', 'ios', 'wp'].indexOf(mode) === -1) {
      throw 'CustomIcon: Mode ' + mode + ' not supported';
    }
    this._updateClass('mode', mode);
  }

  /**
   * Update icon to active/inactive.
   * @param active
   */
  protected updateActive(active: boolean) {
    let classVal;
    if (active || typeof active === 'undefined') {
      classVal = null;
    } else {
      classVal = 'inactive';
    }
    this._updateClass('active', classVal);
  }

  /**
   * Update class (key) to given value
   * @param key
   * @param value
   * @private
   */
  private _updateClass(key: string, value: string) {
    this._classUpdaterPromise.then((classUpdater: ClassUpdater) => {
      if (this._classes[key]) {
        classUpdater.removeClass(this._classes[key]);
      }
      if (!value) {
        this._classes[key] = null;
        return;
      }
      this._classes[key] = value;
      classUpdater.addClass(value);
    });
  }

  /**
   * Remove all CSS class values from this element set by this class.
   */
  protected removeElementClasses() {
    this._classUpdaterPromise.then((classUpdater: ClassUpdater) => {
      for (let key in this._classes) {
        if (this._classes[key]) {
          classUpdater.removeClass(this._classes[key]);
          this._classes[key] = null;
        }
      }
    });
  }

}
