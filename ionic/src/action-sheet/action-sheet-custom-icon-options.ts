import {ActionSheetOptions} from 'ionic-angular';

/**
 * Default Ionic ActionSheet button options. Definition is not exported in the Ionic lib.
 * @see https://github.com/driftyco/ionic/blob/v3.5.3/src/components/action-sheet/action-sheet-options.ts
 */
export interface ActionSheetButtonOptions {
  text?: string;
  role?: string;
  icon?: string;
  cssClass?: string;
  handler?: () => boolean | void;
}

/**
 * Options for button icon in an action sheet.
 */
export interface ActionSheetButtonCustomIconOptions {
  name: string;
  set: string;
  active?: boolean;
}

/**
 * TODO: docs
 */
export interface ActionSheetCustomIconButtonOptions extends ActionSheetButtonOptions {
  customIcon?: ActionSheetButtonCustomIconOptions;
}

/**
 * ActionSheet create options with ability to set buttons with custom icons.
 */
export interface ActionSheetCustomIconOptions extends ActionSheetOptions {
  buttons?: Array<ActionSheetCustomIconButtonOptions>;
}
