import { ElementRef, Renderer, AfterContentInit, AfterContentChecked } from '@angular/core';
/**
 * Directive that assigns an appropriate CSS class to button components with a custom-icon as child.
 * This code has been adapted from Ionic's button component class.
 *
 * @see https://github.com/driftyco/ionic/blob/2.0/src/components/button/button.ts
 *
 * @author Gerrit Erpenstein
 */
export declare class ButtonCustomIcon implements AfterContentInit, AfterContentChecked {
    private _elementRef;
    private _renderer;
    private _role;
    /**
     * Additional icon specific CSS class
     */
    private _icon;
    /**
     * Content initialized?
     */
    private _init;
    constructor(_elementRef: ElementRef, _renderer: Renderer);
    /**
     * Called after the directive's content has been fully
     * initialized.
     */
    ngAfterContentInit(): void;
    /**
     * Called after every check of a directive's content.
     */
    ngAfterContentChecked(): void;
    /**
     * Iterate component's child nodes, find custom icons and set icon specific CSS class.
     * @private
     */
    private _setIconClass();
    /**
     * Set/remove given CSS class for this component's element.
     * @param type CSS class without prefix
     * @param assignCssClass `true` to add class, `false` to remove class
     * @private
     */
    private _setClass(type, assignCssClass);
}
