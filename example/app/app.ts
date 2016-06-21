import {Component, provide, Provider, PLATFORM_DIRECTIVES} from '@angular/core';
import {Platform, ionicBootstrap, IONIC_DIRECTIVES, ionicProviders} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {IconsPage} from './pages/icons/icons';

import {CUSTOM_ICON_DIRECTIVES} from 'ionic2-custom-icons/directive';

@Component({
    template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

    private rootPage:any;

    constructor(private platform:Platform) {
        this.rootPage = IconsPage;

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
        });
    }
}

ionicBootstrap(MyApp, [
    {
        provide: PLATFORM_DIRECTIVES, useValue: [CUSTOM_ICON_DIRECTIVES], multi: true
    }
]);