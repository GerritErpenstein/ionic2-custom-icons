import {Config} from 'ionic-angular';
import {CustomIconBase} from '../../custom-icon-base';
import {ActionSheetButtonCustomIconOptions} from '../action-sheet-custom-icon-options';
import {HTMLElementClassUpdater} from '../../util/HTMLElementClassUpdater';

/**
 * Renders a custom icon into an action sheet button.
 *
 * @author Gerrit Erpenstein
 */
export class ActionSheetButtonCustomIcon extends CustomIconBase {

  private _iconElement: HTMLElement;

  constructor(private _options: ActionSheetButtonCustomIconOptions, private _buttonElement: HTMLElement, config: Config) {
    super(config);
  }

  /**
   * Render the custom icon.
   */
  public render(): void {
    this._iconElement = document.createElement('custom-icon');
    const classUpdater = new HTMLElementClassUpdater(this._iconElement);
    this.classUpdater = classUpdater;
    classUpdater.addClass('action-sheet-icon');
    this._updateOptions();

    const buttonInnerElement = this._buttonElement.querySelector('.button-inner');
    buttonInnerElement.insertBefore(this._iconElement, buttonInnerElement.firstChild);

    this._buttonElement.setAttribute('icon-left','');
  }

  private _updateOptions(options?: ActionSheetButtonCustomIconOptions) {
    if (options) {
      this._options = options;
    }
    super.updateSet(this._options.set);
    super.updateIcon(this._options.name);
    super.updateActive(this._options.active);
  }

  /**
   * Destroy/remove the custom icon.
   */
  public destroy(): void {
    if (!this._iconElement) {
      console.warn('Unable to destroy icon (has not been rendered)');
      return;
    }
    this._buttonElement.removeChild(this._iconElement);
    this._iconElement = undefined;
    this._buttonElement.removeAttribute('icon-left')
  }

}
