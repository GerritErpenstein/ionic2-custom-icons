import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomIcon } from './custom-icon.directive';
import { ButtonCustomIcon } from './button-custom-icon.directive';
import { TabCustomIcon } from './tab-custom-icon.directive';
export var CustomIconsModule = (function () {
    function CustomIconsModule() {
    }
    CustomIconsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [CustomIcon, ButtonCustomIcon, TabCustomIcon],
                    declarations: [CustomIcon, ButtonCustomIcon, TabCustomIcon]
                },] },
    ];
    /** @nocollapse */
    CustomIconsModule.ctorParameters = [];
    return CustomIconsModule;
}());
