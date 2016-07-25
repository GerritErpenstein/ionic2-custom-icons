export * from './custom-icon.directive';
export * from './button-custom-icon.directive';
export * from './tab-custom-icon.directive';

import {CustomIcon} from './custom-icon.directive';
import {ButtonCustomIcon} from './button-custom-icon.directive';
import {TabCustomIcon} from './tab-custom-icon.directive';

export const CUSTOM_ICON_DIRECTIVES = [CustomIcon, ButtonCustomIcon, TabCustomIcon];