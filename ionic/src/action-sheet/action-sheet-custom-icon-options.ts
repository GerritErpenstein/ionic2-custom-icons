import {ActionSheetOptions} from 'ionic-angular';

/**
 * Default Ionic ActionSheet button options. Definition is missing in the Ionic lib.
 * @see https://github.com/driftyco/ionic/blob/v3.1.1/src/components/action-sheet/action-sheet-options.ts
 */
export interface ActionSheetButtonOptions {
  text?: string;
  icon?: string;
  handler?: any;
  cssClass?: any;
  role?: any;
}

/**
 * TODO: docs
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
 * TODO: docs
 */
export interface ActionSheetCustomIconOptions extends ActionSheetOptions {
  buttons?: Array<ActionSheetCustomIconButtonOptions>;
}
