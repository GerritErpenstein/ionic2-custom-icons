import {Component} from '@angular/core';
import {CUSTOM_ICON_DIRECTIVES} from 'ionic2-custom-icons/directive';

@Component({
    templateUrl: 'build/pages/icons/icons.html',
    //directives: [CUSTOM_ICON_DIRECTIVES]
})
export class IconsPage {
    private mySet:string = 'ei';
    private myIconName:string = 'gear';
    private myIonicIconName:string = 'cog';
}
