import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {CustomIcon} from './custom-icon.directive';
import {ButtonCustomIcon} from './button-custom-icon.directive';
import {TabCustomIcon} from './tab-custom-icon.directive';

@NgModule({
   imports: [CommonModule],
   exports: [CustomIcon, ButtonCustomIcon, TabCustomIcon],
   declarations: [CustomIcon, ButtonCustomIcon, TabCustomIcon]
})
export class CustomIconsModule {
}
