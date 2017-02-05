var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Directive, ElementRef, Renderer, Input } from '@angular/core';
import { Config } from 'ionic-angular';
import { CustomIconBase } from './custom-icon-base';
import { ElementRefClassUpdater } from './util/ElementRefClassUpdater';
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
export var CustomIcon = (function (_super) {
    __extends(CustomIcon, _super);
    function CustomIcon(_elementRef, _renderer, config) {
        _super.call(this, config);
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        /**
         * Icon name
         */
        this.iconName = '';
        /**
         * Icon set name
         */
        this.iconSet = '';
        this.classUpdater = new ElementRefClassUpdater(_elementRef, _renderer);
    }
    /**
     * Called on input parameter value changes.
     */
    CustomIcon.prototype.ngOnChanges = function (changes) {
        _super.prototype.update.call(this, this.iconName, this.iconSet);
    };
    /**
     * Lifecycle hook when the directive is destroyed.
     */
    CustomIcon.prototype.ngOnDestroy = function () {
        _super.prototype.removeElementClasses.call(this);
    };
    CustomIcon.decorators = [
        { type: Directive, args: [{
                    selector: 'custom-icon',
                    host: {
                        'role': 'img'
                    }
                },] },
    ];
    /** @nocollapse */
    CustomIcon.ctorParameters = [
        { type: ElementRef, },
        { type: Renderer, },
        { type: Config, },
    ];
    CustomIcon.propDecorators = {
        'iconName': [{ type: Input, args: ['name',] },],
        'iconSet': [{ type: Input, args: ['set',] },],
    };
    return CustomIcon;
}(CustomIconBase));
