import {ElementRef} from '@angular/core/core';
import {ActionSheet, Config} from 'ionic-angular';
import {ActionSheetCustomIconButtonOptions} from '../action-sheet-custom-icon-options';
import {ActionSheetButtonCustomIcon} from './action-sheet-button-custom-icon';

/**
 * Helper controller for adding/removing custom icons to the buttons in an action sheet.
 *
 * @author Gerrit Erpenstein
 */
export class ActionSheetButtonsController {

  private _elementRef: ElementRef;
  private _icons: Array<ActionSheetButtonCustomIcon> = [];

  constructor(private _actionSheet: ActionSheet,
              private _buttonOptions: Array<ActionSheetCustomIconButtonOptions>,
              private _config: Config) {
  }

  /**
   * Initially get and set the ElementRef instance of the action sheet.
   * @private
   */
  private _initElementRef(): void {
    if (!this._elementRef) {
      this._elementRef = this._actionSheet.pageRef();
    }
  }

  /**
   * Add/set the custom icons for the action sheet instance.
   */
  public addCustomIcons(): void {
    this._initElementRef();
    const buttons: Array<HTMLElement> = this._elementRef.nativeElement.querySelectorAll('button');
    // Set custom icon for each button
    for (let i = 0; i < buttons.length; i++) {
      if (this._buttonOptions[i].hasOwnProperty('customIcon')) {
        const customIcon = new ActionSheetButtonCustomIcon(this._buttonOptions[i].customIcon, buttons[i], this._config);
        customIcon.render();
        this._icons.push(customIcon);
      }
    }
  }

  /**
   * Remove the custom icons of the action sheet instance.
   */
  public removeCustomIcons(): void {
    for (let icon of this._icons) {
      icon.destroy();
    }
    this._icons = [];
  }

}
