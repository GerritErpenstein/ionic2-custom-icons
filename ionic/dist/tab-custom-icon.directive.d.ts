import { ElementRef, AfterContentInit, OnDestroy, OnChanges, SimpleChange } from '@angular/core';
import { Tabs, Config } from 'ionic-angular';
import { CustomIconBase } from './custom-icon-base';
/**
 * Directive for adding a custom icon to an ion-tab element. Use the input properties 'customIconSet' and
 * 'customIconName' to set the icon's set and name.
 *
 * Example usage:
 * @usage
 * ```html
 * <ion-tab customIconSet="mySet" customIconName="myIcon" ...></ion-tab>
 * ```
 *
 * @author Gerrit Erpenstein
 */
export declare class TabCustomIcon extends CustomIconBase implements AfterContentInit, OnChanges, OnDestroy {
    private _elementRef;
    private _tabs;
    /**
     * Icon set name
     */
    iconSet: string;
    /**
     * Icon name
     */
    iconName: string;
    /**
     * Icon element in DOM
     */
    private _iconElement;
    constructor(_elementRef: ElementRef, _tabs: Tabs, config: Config);
    /**
     * (Called after Angular projects external content into its view.)
     */
    ngAfterContentInit(): void;
    /**
     * Add icon element to it's corresponding tab.
     * @private
     */
    private _addIcon();
    /**
     * Called on input parameter value changes.
     */
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
    /**
     * Update/set the icon's css class.
     * @private
     */
    private _update();
    /**
     * Called just before Angular destroys the directive/component.
     */
    ngOnDestroy(): void;
}
