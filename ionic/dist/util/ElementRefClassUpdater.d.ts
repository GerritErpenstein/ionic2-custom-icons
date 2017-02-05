import { ElementRef, Renderer } from '@angular/core';
import { ClassUpdater } from './ClassUpdater';
/**
 * ClassUpdater implementation for ElementRef type.
 *
 * @author Gerrit Erpenstein
 */
export declare class ElementRefClassUpdater implements ClassUpdater {
    private _elementRef;
    private _renderer;
    constructor(_elementRef: ElementRef, _renderer: Renderer);
    addClass(clazz: string): void;
    removeClass(clazz: string): void;
}
