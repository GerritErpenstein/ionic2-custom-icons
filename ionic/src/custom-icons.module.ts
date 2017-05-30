import {NgModule}      from '@angular/core';
import {CommonModule}  from '@angular/common';
import {CustomIcon} from './icon/custom-icon.directive';
import {ButtonCustomIcon} from './button/button-custom-icon.directive';
import {TabCustomIcon} from './tabs/tab-custom-icon.directive';
import {ActionSheetCustomIconController} from './action-sheet/action-sheet-custom-icon-controller';

@NgModule({
  imports: [CommonModule],
  exports: [CustomIcon, ButtonCustomIcon, TabCustomIcon],
  declarations: [CustomIcon, ButtonCustomIcon, TabCustomIcon],
  providers: [ActionSheetCustomIconController]
})
export class CustomIconsModule {
}
