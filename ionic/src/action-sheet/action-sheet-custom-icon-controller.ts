import {Injectable} from '@angular/core';
import {ActionSheet, App, Config} from 'ionic-angular';
import {ActionSheetButtonsController} from './button/action-sheet-buttons-controller';
import {ActionSheetCustomIconOptions} from './action-sheet-custom-icon-options';

/**
 *
 * Drop-in replacement for Ionic's ActionSheetController that supports custom icons in the dialog.
 *
 * @author Gerrit Erpenstein
 * @see https://ionicframework.com/docs/api/components/action-sheet/ActionSheetController/
 */
@Injectable()
export class ActionSheetCustomIconController {

  constructor(private _app: App, private _config: Config) {
  }

  /**
   * Create an action sheet instance. Call present() on the instance to show the dialog.
   * @param {ActionSheetCustomIconOptions} options Action sheet options
   * @returns {ActionSheet}
   */
  create(options: ActionSheetCustomIconOptions = {}): ActionSheet {
    const actionSheet = new ActionSheet(this._app, options, this._config),
      buttonsController = new ActionSheetButtonsController(actionSheet, options.buttons, this._config);

    // Add/set custom icons when the action sheet becomes active
    actionSheet.willEnter.subscribe(() => buttonsController.addCustomIcons());
    // Remove custom icons when the action sheet is destroyed
    actionSheet.willUnload.subscribe(() => buttonsController.removeCustomIcons());

    return actionSheet;
  }

}
