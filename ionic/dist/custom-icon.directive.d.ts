import { ElementRef, Renderer, OnChanges, SimpleChange, OnDestroy } from '@angular/core';
import { Config } from 'ionic-angular';
import { CustomIconBase } from './custom-icon-base';
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
export declare class CustomIcon extends CustomIconBase implements OnChanges, OnDestroy {
    private _elementRef;
    private _renderer;
    /**
     * Icon name
     */
    iconName: string;
    /**
     * Icon set name
     */
    iconSet: string;
    constructor(_elementRef: ElementRef, _renderer: Renderer, config: Config);
    /**
     * Called on input parameter value changes.
     */
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    /**
     * Lifecycle hook when the directive is destroyed.
     */
    ngOnDestroy(): void;
}
