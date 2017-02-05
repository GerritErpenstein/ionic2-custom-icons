import { ClassUpdater } from './ClassUpdater';
/**
 * ClassUpdater implementation for HTMLElement type.
 *
 * @author Gerrit Erpenstein
 */
export declare class HTMLElementClassUpdater implements ClassUpdater {
    private _htmlElement;
    constructor(_htmlElement: HTMLElement);
    addClass(clazz: string): void;
    removeClass(clazz: string): void;
}
